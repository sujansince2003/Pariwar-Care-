import { Request, Response } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../db/db.config'

export interface SignupData {
    name: string
    email: string
    password: string
    role: 'CHILD' | 'NURSE' | 'ADMIN'
}

export interface LoginData {
    email: string
    password: string
}


// Validation schemas
const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(["CHILD","ADMIN","NURSE"])
})

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
})

export const signupController = async (req: Request, res: Response) => {
    try {
        // Validate input
        const validatedData = signupSchema.safeParse(req.body)
          if(!validatedData.success){
            res.json({
                message:"invalid data "
            })
            return
          }
          


        
         const { name, email, password, role } = validatedData.data
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    
    if (existingUser) {
         res.json({
                message:"user already exists "
            })
            return
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { user }
        })
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            })
        }
        
        res.status(400).json({
            success: false,
            message: error.message || 'Signup failed'
        })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.safeParse(req.body)
        if(!validatedData.success){
            res.json({
            message:"invalid"

            })
            return
        }
      const { email, password } = validatedData.data
    
    // Find user
    const user = await prisma.user.findUnique({
        where: { email }
    })
    
    if (!user) {
        res.json({
            message:"user not found"
        })
        return
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
         res.json({
            message:"password not found"
        })
        return
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            role: user.role 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
    )
   
        
        
       
        
        // Set token in cookie (optional)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token: token,
                user: token
            }
        })
        return
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            })
        }
        
        res.status(401).json({
            success: false,
            message: error.message || 'Login failed'
        })
        return
    }
}