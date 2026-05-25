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
