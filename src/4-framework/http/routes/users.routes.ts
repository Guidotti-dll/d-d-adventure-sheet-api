import { Router, type Request, type Response, type NextFunction } from 'express'
import { container } from '@shared/ioc/container'
import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { InputCreateUser } from '@controller/serializers/users/createUserSerializer'
import { InputFindUser } from '@controller/serializers/users/findUserSerializer'
import { Permissions } from '@framework/utility/permissions'
import { mapBusinessErrorToStatus } from '@framework/http/utils/mapBusinessErrorToStatus'
import { sanitizeUser } from '@framework/http/utils/sanitizeUser'
import { requirePermissions } from '@framework/http/middleware/requirePermissions'

const router = Router()

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next)
  }
}

router.post(
  '/',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(CreateUserOperator)

    console.log({ input: req.body })

    const input = new InputCreateUser(req.body)

    console.log({ input })
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
  '/:id',
  requirePermissions(Permissions.readPeople),
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(FindUserOperator)
    const userId = String(req.params.id)
    if (Number.isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user id' })
      return
    }
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

export const usersRouter = router
