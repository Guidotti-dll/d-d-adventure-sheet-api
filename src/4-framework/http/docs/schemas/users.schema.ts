export const UserSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'string',
    },

    name: {
      type: 'string',
    },

    email: {
      type: 'string',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
}

export const CreateUserSchema = {
  type: 'object',

  properties: {
    name: {
      type: 'string',
    },

    email: {
      type: 'string',
    },

    password: {
      type: 'string',
    },
  },

  required: ['name', 'email', 'password'],
}
