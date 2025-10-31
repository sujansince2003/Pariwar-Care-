import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: any
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Access token required' 
            })
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET not configured')
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({ 
                    success: false,
                    message: 'Invalid or expired token' 
                })
            }
            req.user = user
            next()
        })
    } catch (error) {
        console.error('Auth middleware error:', error)
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        })
    }
}