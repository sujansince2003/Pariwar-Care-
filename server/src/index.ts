import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import fileupload from "express-fileupload"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/users'
import parentRoutes from './routes/parents.routes'
import visitRoutes from './routes/visits.routes'
import nursesRoutes from './routes/nurses.routes'
import analyticsRoutes from './routes/analytics.routes'

import swaggerUi from 'swagger-ui-express'
import { specs } from './config/swagger'

// Load environment variables
dotenv.config()

// Validate required environment variables
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is required')
    process.exit(1)
}



// Add after other middleware

const app = express()
const PORT = process.env.PORT || 8000

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
})
app.use('/api/', limiter)

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }))
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
    credentials: true
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


// Static files
app.use("/uploads/images", express.static("src/uploads/images"))
app.use("/uploads/coverimgs", express.static("src/uploads/coverimgs"))

// Basic routes
app.get("/", (req: Request, res: Response) => {
    res.json({ 
        message: "Team-ALPHA Backend API",
        status: "running",
        timestamp: new Date().toISOString()
    })
})

app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({
        message: "API is healthy",
        status: "success"
    })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/parents', parentRoutes)
app.use('/api/visits', visitRoutes)
app.use('/api/nurses', nursesRoutes)
app.use('/api/analytics', analyticsRoutes)

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error:', err)
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    })
})

// 404 handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`)
})
