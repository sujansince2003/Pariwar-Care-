import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../db/db.config'

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string
        email: string
        role: string
    }
}

const visitSchema = z.object({
    parentId: z.string().min(1, 'Parent ID is required'),
    scheduledFor: z.string().datetime('Invalid date format'),
    visitType: z.enum(['BASIC', 'FULL'])
})

// POST /visits - Schedule appointment
export const scheduleVisit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const validatedData = visitSchema.safeParse(req.body)
        if (!validatedData.success) {
            res.json({
                message: "invalid data"
            })
            return
        }

        const { parentId, scheduledFor, visitType } = validatedData.data

        // Check if parent belongs to the logged-in child
        const parent = await prisma.parent.findFirst({
            where: {
                id: parentId,
                children: {
                    some: { id: req.user!.userId }
                }
            }
        })

        if (!parent) {
            res.json({
                message: "parent not found or not authorized"
            })
            return
        }

        const visit = await prisma.visit.create({
            data: {
                parentId,
                scheduledFor: new Date(scheduledFor),
                visitType,
                status: 'PENDING'
            },
            include: {
                Parent: {
                    select: {
                        name: true,
                        address: true
                    }
                }
            }
        })

        res.status(201).json({
            success: true,
            message: 'Visit scheduled successfully',
            data: { visit }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to schedule visit'
        })
    }
}

// GET /visits/child - Get child's visits
export const getChildVisits = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const visits = await prisma.visit.findMany({
            where: {
                Parent: {
                    children: {
                        some: { id: req.user!.userId }
                    }
                }
            },
            include: {
                Parent: {
                    select: {
                        name: true,
                        address: true
                    }
                },
                Nurse: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                scheduledFor: 'desc'
            }
        })

        res.status(200).json({
            success: true,
            message: 'Visits retrieved successfully',
            data: { visits }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to get visits'
        })
    }
}