import { authPaths } from './paths/auth.path'
import { usersPaths } from './paths/users.path'
import { campaignsPaths } from './paths/campaigns.path'

import {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  BooleanResponseSchema,
  ResetPasswordRequestSchema,
} from './schemas/auth.schema'

import { UpdateUserSchema, UserListSchema, UserSchema } from './schemas/users.schema'
import { CampaignSchema, CreateCampaignSchema, CampaignListSchema } from './schemas/campaigns.schema'

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

    {
      name: 'Campaign',
    },
  ],

  paths: {
    ...authPaths,
    ...usersPaths,
    ...campaignsPaths,
  },

  components: {
    schemas: {
      User: UserSchema,

      UpdateUserSchema,

      UserListSchema,

      CampaignSchema,

      CreateCampaignSchema,

      CampaignListSchema,

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
