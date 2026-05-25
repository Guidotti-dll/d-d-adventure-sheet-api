export const authPaths = {
  '/auth/login': {
    post: {
      tags: ['Auth'],

      summary: 'Login do usuário',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest',
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Login realizado',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginResponse',
              },
            },
          },
        },

        401: {
          description: 'Credenciais inválidas',
        },
      },
    },
  },
}
