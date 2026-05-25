import { authPaths } from './paths/auth.path'
import { usersPaths } from './paths/users.path'

import { LoginRequestSchema, LoginResponseSchema } from './schemas/auth.schema'

import { UserSchema } from './schemas/users.schema'

export const openApiConfig = {
  openapi: '3.0.0',

  info: {
    title: 'D & D Adventure Sheet',
    version: '1.0.0',
    description: 'API de gerenciamento de fichas e sessões de RPG',
  },

  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],

  tags: [
    {
      name: 'Auth',
    },

    {
      name: 'Users',
    },
  ],

  paths: {
    ...authPaths,
    ...usersPaths,
  },

  components: {
    schemas: {
      User: UserSchema,

      LoginRequest: LoginRequestSchema,

      LoginResponse: LoginResponseSchema,
    },

    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
}
