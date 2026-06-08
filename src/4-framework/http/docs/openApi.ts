import { authPaths } from './paths/auth.path'
import { usersPaths } from './paths/users.path'

import {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  BooleanResponseSchema,
  ResetPasswordRequestSchema,
} from './schemas/auth.schema'

import { UpdateUserSchema, UserListSchema, UserSchema } from './schemas/users.schema'

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

      UpdateUserSchema,

      UserListSchema,

      LoginRequest: LoginRequestSchema,

      LoginResponse: LoginResponseSchema,

      ForgotPasswordRequest: ForgotPasswordRequestSchema,

      ResetPasswordRequest: ResetPasswordRequestSchema,

      BooleanResponse: BooleanResponseSchema,
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
