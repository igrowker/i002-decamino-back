import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: ' DECAMINO API 🚗',
            description: 'DeCamino es una aplicación web, diseñada con un enfoque móvil, que promueve el turismo en pueblos rurales a través de la gastronomía local.',
            contact: {
                name: 'Abel Acevedo'
            },
        },
        servers: [
            {
                url: "http://localhost:8080/api/"
            }
        ],
        components: {
            schemas: {
                UserInput: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'The user\'s username'
                        },
                        email: {
                            type: 'string',
                            description: 'The user\'s email'
                        },
                        password: {
                            type: 'string',
                            description: 'The user\'s password'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            description: 'The user\'s role'
                        },
                    },
                    example: {
                        username: 'johndoe',
                        email: 'johndoe@example.com',
                        password: 'password123',
                        role: 'user'
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated id of the user'
                        },
                        username: {
                            type: 'string',
                            description: 'The user\'s username'
                        },
                        email: {
                            type: 'string',
                            description: 'The user\'s email'
                        },
                        password: {
                            type: 'string',
                            description: 'The user\'s password'
                        },
                        favorites: {
                            type: 'array',
                            items: {
                                type: 'string',
                                description: 'An array of restaurant IDs the user has favorited'
                            }
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            description: 'The user\'s role'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date the user was created'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date the user was last updated'
                        },
                        __v: {
                            type: 'number',
                            description: 'The version key'
                        }
                    },
                    example: {
                        _id: '667f0ee528c05b018579940c',
                        username: 'sasassalkasaslk',
                        email: 'asasa1klsask2@gmail.com',
                        password: '$2b$10$CIagEpgMBmd0npmruBRTW.UI/XWtd5GLa7x6XR6Q/fIh.Qt8vOpLC',
                        favorites: [],
                        role: 'user',
                        createdAt: '2024-06-28T19:28:37.910Z',
                        updatedAt: '2024-06-28T19:28:37.910Z',
                        __v: 0
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swaggerOptions;
