export const CampaignSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    dungeonMasterId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    setting: { type: 'string', nullable: true },
    status: { type: 'string' },
    visibility: { type: 'string' },
    startedAt: { type: 'string', format: 'date-time', nullable: true },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
}

export const CreateCampaignSchema = {
  type: 'object',
  properties: {
    dungeonMasterId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    setting: { type: 'string' },
  },
  required: ['dungeonMasterId', 'name'],
}

export const CampaignListSchema = {
  type: 'object',
  properties: {
    items: { type: 'array', items: { $ref: '#/components/schemas/CampaignSchema' } },
    pagination: { type: 'object' },
  },
}
