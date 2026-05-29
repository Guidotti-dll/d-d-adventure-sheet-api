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

export const UpdateUserSchema = {
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
      minLength: 6,
    },

    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE'],
    },
  },
}

export const UserListSchema = {
  type: 'object',

  properties: {
    items: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/UserSchema',
      },
    },

    pagination: {
      type: 'object',
      properties: {
        totalRecords: { type: 'number' },
        totalPages: { type: 'number' },
        limit: { type: 'number' },
        page: { type: 'number' },
        hasPrevPage: { type: 'boolean' },
        hasNextPage: { type: 'boolean' },
        prevPage: { type: 'number', nullable: true },
        nextPage: { type: 'number', nullable: true },
      },
    },
  },
}
