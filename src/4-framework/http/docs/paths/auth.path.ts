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

  '/auth/forgot-password': {
    post: {
      tags: ['Auth'],

      summary: 'Solicitar recuperação de senha',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForgotPasswordRequest',
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Solicitação processada',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BooleanResponse',
              },
            },
          },
        },
      },
    },
  },

  '/auth/reset-password': {
    post: {
      tags: ['Auth'],

      summary: 'Redefinir senha com token de recuperação',

      requestBody: {
        required: true,

        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResetPasswordRequest',
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Senha redefinida',

          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BooleanResponse',
              },
            },
          },
        },

        400: {
          description: 'Token inválido, expirado ou já utilizado',
        },
      },
    },
  },
}
