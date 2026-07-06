import { Router, type Request, type Response, type NextFunction } from 'express'
import { container } from '@shared/ioc/container'
import { CreateCampaignOperator } from '@controller/operations/campaign/createCampaignOperator'
import { DeleteCampaignOperator } from '@controller/operations/campaign/deleteCampaignOperator'
import { FindCampaignOperator } from '@controller/operations/campaign/findCampaignOperator'
import { ListCampaignsOperator } from '@controller/operations/campaign/listCampaignsOperator'
import { UpdateCampaignOperator } from '@controller/operations/campaign/updateCampaignOperator'
import { InputCreateCampaign } from '@controller/serializers/campaign/createCampaignSerializer'
import { InputDeleteCampaign } from '@controller/serializers/campaign/deleteCampaignSerializer'
import { InputFindCampaign } from '@controller/serializers/campaign/findCampaignSerializer'
import { InputListCampaigns } from '@controller/serializers/campaign/listCampaignsSerializer'
import { InputUpdateCampaign } from '@controller/serializers/campaign/updateCampaignSerializer'
import { Permissions } from '@framework/utility/permissions'
import { mapBusinessErrorToStatus } from '@framework/http/utils/mapBusinessErrorToStatus'
import { authenticate } from '@framework/http/middleware/authenticate'
import { requirePermissions } from '@framework/http/middleware/requirePermissions'

const router = Router()

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next)
  }
}

function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

router.post(
  '/',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(CreateCampaignOperator)
    const input = new InputCreateCampaign(req.body)
    const result = await operator.exec(input)
    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }
    res.status(201).json({ campaign: result.value })
  })
)

router.get(
  '/',
  authenticate,
  requirePermissions(Permissions.readPeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(ListCampaignsOperator)
    const input = new InputListCampaigns({
      name: typeof req.query.name === 'string' ? req.query.name : undefined,
      dungeonMasterId: typeof req.query.dungeonMasterId === 'string' ? req.query.dungeonMasterId : undefined,
      status: typeof req.query.status === 'string' ? req.query.status : undefined,
      page: parseOptionalInt(req.query.page),
      limit: parseOptionalInt(req.query.limit),
    })
    const result = await operator.exec(input)
    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }
    res.status(200).json({ items: result.value.items, pagination: result.value.pagination })
  })
)

router.get(
  '/:id',
  authenticate,
  requirePermissions(Permissions.readPeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(FindCampaignOperator)
    const input = new InputFindCampaign({ campaignId: String(req.params.id) })
    const result = await operator.exec(input)
    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }
    res.status(200).json({ campaign: result.value })
  })
)

router.put(
  '/:id',
  authenticate,
  requirePermissions(Permissions.writePeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(UpdateCampaignOperator)
    const input = new InputUpdateCampaign({ campaignId: String(req.params.id), ...req.body })
    const result = await operator.exec(input)
    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }
    res.status(200).json({ campaign: result.value })
  })
)

router.delete(
  '/:id',
  authenticate,
  requirePermissions(Permissions.deletePeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(DeleteCampaignOperator)
    const input = new InputDeleteCampaign({ campaignId: String(req.params.id) })
    const result = await operator.exec(input)
    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }
    res.status(204).send()
  })
)

export const campaignsRouter = router
