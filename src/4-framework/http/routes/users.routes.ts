import { Router, type Request, type Response, type NextFunction } from 'express'
import { container } from '@shared/ioc/container'
import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { DeleteUserOperator } from '@controller/operations/users/deleteUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { ListUsersOperator } from '@controller/operations/users/listUsersOperator'
import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'
import { InputCreateUser } from '@controller/serializers/users/createUserSerializer'
import { InputDeleteUser } from '@controller/serializers/users/deleteUserSerializer'
import { InputFindUser } from '@controller/serializers/users/findUserSerializer'
import { InputListUsers } from '@controller/serializers/users/listUsersSerializer'
import { InputUpdateUser } from '@controller/serializers/users/updateUserSerializer'
import { Permissions } from '@framework/utility/permissions'
import { mapBusinessErrorToStatus } from '@framework/http/utils/mapBusinessErrorToStatus'
import { sanitizeUser } from '@framework/http/utils/sanitizeUser'
import { authenticate } from '@framework/http/middleware/authenticate'
import { requirePermissions } from '@framework/http/middleware/requirePermissions'

const router = Router()

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next)
  }
}

function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

router.post(
  '/',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(CreateUserOperator)
    const input = new InputCreateUser(req.body)
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(201).json({ user: sanitizeUser(result.value) })
  })
)

router.get(
  '/',
  authenticate,
  requirePermissions(Permissions.readPeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(ListUsersOperator)
    const input = new InputListUsers({
      name: typeof req.query.name === 'string' ? req.query.name : undefined,
      email: typeof req.query.email === 'string' ? req.query.email : undefined,
      page: parseOptionalInt(req.query.page),
      limit: parseOptionalInt(req.query.limit),
    })
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(200).json({
      items: result.value.items.map(sanitizeUser),
      pagination: result.value.pagination,
    })
  })
)

router.get(
  '/:id',
  authenticate,
  requirePermissions(Permissions.readPeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(FindUserOperator)
    const userId = String(req.params.id)
    const input = new InputFindUser({ userId })
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(200).json({ user: sanitizeUser(result.value) })
  })
)

router.put(
  '/:id',
  authenticate,
  requirePermissions(Permissions.writePeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(UpdateUserOperator)
    const input = new InputUpdateUser({
      userId: String(req.params.id),
      ...req.body,
    })
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(200).json({ user: sanitizeUser(result.value) })
  })
)

router.delete(
  '/:id',
  authenticate,
  requirePermissions(Permissions.deletePeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(DeleteUserOperator)
    const input = new InputDeleteUser({ userId: String(req.params.id) })
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(204).send()
  })
)

export const usersRouter = router
