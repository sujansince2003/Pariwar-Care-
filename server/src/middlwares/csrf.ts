import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

interface CSRFRequest extends Request {
    csrfToken?: string
}

const generateToken = (): string => {
    return crypto.randomBytes(32).toString('hex')
}

export const csrfProtection = (req: CSRFRequest, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        const token = generateToken()
        req.csrfToken = token
        res.cookie('csrf-token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return next()
    }

    const tokenFromHeader = req.headers['x-csrf-token'] as string
    const tokenFromCookie = req.cookies['csrf-token']

    if (!tokenFromHeader || !tokenFromCookie || tokenFromHeader !== tokenFromCookie) {
        return res.status(403).json({
            success: false,
            message: 'Invalid CSRF token'
        })
    }

    next()
}