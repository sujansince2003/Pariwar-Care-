interface LogData {
    [key: string]: any
}

export const logger = {
    info: (message: string, data?: LogData) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data ? JSON.stringify(data) : '')
    },
    
    warn: (message: string, data?: LogData) => {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data ? JSON.stringify(data) : '')
    },
    
    error: (message: string, error?: Error | LogData) => {
        const errorData = error instanceof Error 
            ? { message: error.message, stack: error.stack }
            : error
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, errorData ? JSON.stringify(errorData) : '')
    },
    
    debug: (message: string, data?: LogData) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data ? JSON.stringify(data) : '')
        }
    }
}