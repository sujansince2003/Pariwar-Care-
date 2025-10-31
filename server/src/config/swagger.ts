import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Team-ALPHA Healthcare API',
            version: '1.0.0',
            description: 'Healthcare management system API',
        },
        servers: [{ url: 'http://localhost:8000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
}

export const specs = swaggerJsdoc(options)
