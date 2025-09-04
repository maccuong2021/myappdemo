import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resource API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Resource: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Test Resource",
            },
            description: {
              type: "string",
              example: "This is a test resource",
            },
          },
          required: ["name"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
