import * as swaggerJSdoc from "swagger-jsdoc";
import {Router} from "express";
import * as swaggerUi from "swagger-ui-express";
import { catchAsync } from "../util/catchAsync";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DevSpace API",
      description: "API for DevSpace",
      version: "0.1.0",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Post: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Post ID",
            },
            title: {
              type: "string",
              description: "Post title",
            },
            content: {
              type: "string",
              description: "Post content",
            },
            createdAt: {
              type: "string",
              description: "Post creation date",
            },
            createdBy: {
              $ref: "#/components/schemas/User",
            },
            likedBy: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
            comments: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Comment ID",
            },
            content: {
              type: "string",
              description: "Comment content",
            },
            createdAt: {
              type: "string",
              description: "Comment creation date",
            },
            createdBy: {
              $ref: "#/components/schemas/User",
            },
            likedBy: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        Notification: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Notification ID",
            },
            message: {
              type: "string",
              description: "Notification message",
            },
            timeStamp: {
              type: "string",
              description: "Notification creation date",
            },
            seen: {
              type: "boolean",
              description: "Notification seen status",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "User ID",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
          },
        },
        UserWithRelations: {
          allOf: [
            {
              $ref: "#/components/schemas/User",
            },
            {
              type: "object",
              properties: {
                posts: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Post",
                  },
                },
                comments: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Comment", // Assuming you have a Comment schema
                  },
                },
                followed: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
                followers: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          ],
        },
        UserWithRelationsAndNotifications: {
          allOf: [
            { $ref: "#/components/schemas/UserWithRelations" },
            {
              type: "object",
              properties: {
                notifications: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Notification",
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  apis: ["**/controller/*.ts"],
};

const swaggerDocs = swaggerJSdoc(swaggerOptions);


console.log(swaggerDocs)
export const swaggerRouter = Router()


swaggerRouter.get(
  "/json", catchAsync(async (req, res, next) => {
    res.json(swaggerDocs);
  })
);
swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));