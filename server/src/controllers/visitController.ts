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

const assignNurseSchema = z.object({
    nurseId: z.string().min(1, 'Nurse ID is required')
})

const vitalsSchema = z.object({
    bp: z.string().optional(),
    sugar: z.string().optional(),
    pulse: z.string().optional(),
    oxygen: z.string().optional(),
    temperature: z.string().optional(),
    notes: z.string().optional()
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

// GET /nurses - Get list of nurses
export const getNurses = async (req: Request, res: Response) => {
    try {
        const nurses = await prisma.user.findMany({
            where: {
                role: 'NURSE'
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'Nurses retrieved successfully',
            data: { nurses }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to get nurses'
        })
    }
}

// POST /visits/:id/assign - Assign nurse to visit
export const assignNurseToVisit = async (req: Request, res: Response) => {
    try {
        const visitId = req.params.id
        const validatedData = assignNurseSchema.safeParse(req.body)
        
        if (!validatedData.success) {
            res.json({
                message: "invalid data"
            })
            return
        }

        const { nurseId } = validatedData.data

        // Check if visit exists
        const visit = await prisma.visit.findUnique({
            where: { id: visitId }
        })

        if (!visit) {
            res.json({
                message: "visit not found"
            })
            return
        }

        // Check if nurse exists and has NURSE role
        const nurse = await prisma.user.findFirst({
            where: {
                id: nurseId,
                role: 'NURSE'
            }
        })

        if (!nurse) {
            res.json({
                message: "nurse not found"
            })
            return
        }

        // Assign nurse to visit
        const updatedVisit = await prisma.visit.update({
            where: { id: visitId },
            data: {
                nurseId,
                status: 'ASSIGNED'
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
            }
        })

        res.status(200).json({
            success: true,
            message: 'Nurse assigned successfully',
            data: { visit: updatedVisit }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to assign nurse'
        })
    }
}

// GET /visits/nurse - Get nurse's assigned visits
export const getNurseVisits = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const visits = await prisma.visit.findMany({
            where: {
                nurseId: req.user!.userId
            },
            include: {
                Parent: {
                    select: {
                        name: true,
                        age: true,
                        address: true,
                        diseases: true,
                        medications: true,
                        emergencyContact: true
                    }
                }
            },
            orderBy: {
                scheduledFor: 'asc'
            }
        })

        res.status(200).json({
            success: true,
            message: 'Nurse visits retrieved successfully',
            data: { visits }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to get nurse visits'
        })
    }
}

// POST /visits/:id/start - Start visit
export const startVisit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const visitId = req.params.id

        const visit = await prisma.visit.findFirst({
            where: {
                id: visitId,
                nurseId: req.user!.userId,
                status: 'ASSIGNED'
            }
        })

        if (!visit) {
            res.json({
                message: "visit not found or not assigned to you"
            })
            return
        }

        const updatedVisit = await prisma.visit.update({
            where: { id: visitId },
            data: { status: 'STARTED' }
        })

        res.status(200).json({
            success: true,
            message: 'Visit started successfully',
            data: { visit: updatedVisit }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to start visit'
        })
    }
}

// POST /visits/:id/vitals - Submit vitals
export const submitVitals = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const visitId = req.params.id
        const validatedData = vitalsSchema.safeParse(req.body)
        
        if (!validatedData.success) {
            res.json({
                message: "invalid data"
            })
            return
        }

        const visit = await prisma.visit.findFirst({
            where: {
                id: visitId,
                nurseId: req.user!.userId,
                status: 'STARTED'
            }
        })

        if (!visit) {
            res.json({
                message: "visit not found or not started"
            })
            return
        }

        const vitals = await prisma.vitals.upsert({
            where: { visitId },
            update: validatedData.data,
            create: {
                visitId,
                ...validatedData.data
            }
        })

        res.status(200).json({
            success: true,
            message: 'Vitals submitted successfully',
            data: { vitals }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to submit vitals'
        })
    }
}

// POST /visits/:id/complete - Complete visit
export const completeVisit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const visitId = req.params.id

        const visit = await prisma.visit.findFirst({
            where: {
                id: visitId,
                nurseId: req.user!.userId,
                status: 'STARTED'
            }
        })

        if (!visit) {
            res.json({
                message: "visit not found or not started"
            })
            return
        }

        const updatedVisit = await prisma.visit.update({
            where: { id: visitId },
            data: {
                status: 'COMPLETED',
                completedAt: new Date()
            },
            include: {
                vitals: true,
                Parent: {
                    select: {
                        name: true,
                        address: true
                    }
                }
            }
        })

        // Send email notification to children
        const { sendVisitCompletionEmail } = await import('../utils/sendEmail')
        sendVisitCompletionEmail(visitId).catch(console.error)

        res.status(200).json({
            success: true,
            message: 'Visit completed successfully',
            data: { visit: updatedVisit }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to complete visit'
        })
    }
}