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
        200: {
          description: 'Usuario criado',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserSchema',
              },
            },
          },
        },

        400: {
          description: 'Erro ao criar usuario',
        },
      },
    },
  },
}
