import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scoreboard API',
      version: '1.0.0',
      description: 'API for authentication and score tracking',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              example: 'securePassword123',
            },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'jwt-token-here',
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Cuong' },
              },
            },
          },
        },
        Score: {
          type: 'object',
          properties: {
            score: {
              type: 'number',
              example: 87.5,
            },
          },
        },
        UpdateScoreRequest: {
          type: 'object',
          properties: {
            newScore: {
              type: 'number',
              example: 92.3,
            },
          },
          required: ['newScore'],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Adjust if your route files are elsewhere
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}