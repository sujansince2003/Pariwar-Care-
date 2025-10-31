import { z } from 'zod'

export const commonValidations = {
    id: z.string().min(1, 'ID is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
    date: z.string().datetime('Invalid date format')
}

export const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '')
}

export const validateObjectId = (id: string): boolean => {
    return /^[a-zA-Z0-9]{25}$/.test(id)
}