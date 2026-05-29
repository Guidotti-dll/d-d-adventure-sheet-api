export const usersPaths = {
  '/users': {
    post: {
      tags: ['User'],

      summary: 'Criar usuario do sistema',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserSchema',
            },
          },
        },
      },

      responses: {
        201: {
          description: 'Usuario criado',

          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/UserSchema',
                  },
                },
              },
            },
          },
        },

        400: {
          description: 'Erro ao criar usuario',
        },
      },
    },

    get: {
      tags: ['User'],

      summary: 'Listar usuarios (paginado)',

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: 'name',
          in: 'query',
          schema: { type: 'string' },
        },
        {
          name: 'email',
          in: 'query',
          schema: { type: 'string' },
        },
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', minimum: 1, default: 1 },
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', minimum: 1, default: 10 },
        },
      ],

      responses: {
        200: {
          description: 'Lista de usuarios',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserListSchema',
              },
            },
          },
        },
      },
    },
  },

  '/users/{id}': {
    get: {
      tags: ['User'],

      summary: 'Buscar usuario por id',

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],

      responses: {
        200: {
          description: 'Usuario encontrado',

          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/UserSchema',
                  },
                },
              },
            },
          },
        },

        404: {
          description: 'Usuario nao encontrado',
        },
      },
    },

    put: {
      tags: ['User'],

      summary: 'Atualizar usuario',

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserSchema',
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Usuario atualizado',

          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/UserSchema',
                  },
                },
              },
            },
          },
        },

        404: {
          description: 'Usuario nao encontrado',
        },

        409: {
          description: 'Email ja em uso',
        },
      },
    },

    delete: {
      tags: ['User'],

      summary: 'Excluir usuario',

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],

      responses: {
        204: {
          description: 'Usuario excluido',
        },

        404: {
          description: 'Usuario nao encontrado',
        },
      },
    },
  },
}
