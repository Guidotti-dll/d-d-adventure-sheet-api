export const LoginRequestSchema = {
  type: 'object',

  required: ['email', 'password'],

  properties: {
    email: {
      type: 'string',
    },

    password: {
      type: 'string',
    },
  },
}

export const LoginResponseSchema = {
  type: 'object',

  properties: {
    token: {
      type: 'string',
    },
  },
}

export const ForgotPasswordRequestSchema = {
  type: 'object',

  required: ['email'],

  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
}

export const ResetPasswordRequestSchema = {
  type: 'object',

  required: ['token', 'password'],

  properties: {
    token: {
      type: 'string',
    },

    password: {
      type: 'string',
      minLength: 6,
    },
  },
}

export const BooleanResponseSchema = {
  type: 'boolean',
}
