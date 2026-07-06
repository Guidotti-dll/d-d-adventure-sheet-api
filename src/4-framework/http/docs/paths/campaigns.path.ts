export const campaignsPaths = {
  '/campaigns': {
    post: {
      tags: ['Campaign'],
      summary: 'Criar campanha',
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCampaignSchema' } } },
      },
      responses: {
        201: {
          description: 'Campanha criada',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { campaign: { $ref: '#/components/schemas/CampaignSchema' } } },
            },
          },
        },
        400: { description: 'Erro ao criar campanha' },
      },
    },
    get: {
      tags: ['Campaign'],
      summary: 'Listar campanhas (paginado)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'name', in: 'query', schema: { type: 'string' } },
        { name: 'dungeonMasterId', in: 'query', schema: { type: 'string' } },
        { name: 'status', in: 'query', schema: { type: 'string' } },
        { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
        { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, default: 10 } },
      ],
      responses: {
        200: {
          description: 'Lista de campanhas',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CampaignListSchema' } } },
        },
      },
    },
  },
  '/campaigns/{id}': {
    get: {
      tags: ['Campaign'],
      summary: 'Buscar campanha por id',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: {
        200: {
          description: 'Campanha encontrada',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { campaign: { $ref: '#/components/schemas/CampaignSchema' } } },
            },
          },
        },
        404: { description: 'Campanha nao encontrada' },
      },
    },
    put: {
      tags: ['Campaign'],
      summary: 'Atualizar campanha',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCampaignSchema' } } },
      },
      responses: {
        200: {
          description: 'Campanha atualizada',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { campaign: { $ref: '#/components/schemas/CampaignSchema' } } },
            },
          },
        },
        404: { description: 'Campanha nao encontrada' },
      },
    },
    delete: {
      tags: ['Campaign'],
      summary: 'Excluir campanha',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { 204: { description: 'Campanha excluida' }, 404: { description: 'Campanha nao encontrada' } },
    },
  },
}
