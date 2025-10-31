import { Request, Response, NextFunction } from 'express'

type Role = 'CHILD' | 'NURSE' | 'ADMIN'

interface AuthRequest extends Request {
    user?: {
        userId: string
        email: string
        role: Role
    }
}

export const requireRole = (allowedRoles: Role[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                })
            }
            
            if (!allowedRoles.includes(req.user.role)) {
                console.warn('Access denied:', {
                    userId: req.user.userId,
                    userRole: req.user.role,
                    requiredRoles: allowedRoles,
                    path: req.path
                })
                return res.status(403).json({
                    success: false,
                    message: 'Insufficient permissions'
                })
            }
            
            next()
        } catch (error) {
            console.error('RBAC middleware error:', error)
            return res.status(500).json({
                success: false,
                message: 'Authorization error'
            })
        }
    }
}

// Specific role middlewares
export const requireAdmin = requireRole(['ADMIN'])
export const requireNurse = requireRole(['NURSE', 'ADMIN'])
export const requireChild = requireRole(['CHILD', 'ADMIN'])