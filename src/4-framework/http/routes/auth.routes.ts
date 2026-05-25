import { Router, type Request, type Response, type NextFunction } from 'express'
import { container } from '@shared/ioc/container'
import { LoginOperator } from '@controller/operations/auth/loginOperator'
import { InputLogin } from '@controller/serializers/auth/loginSerializer'
import { mapBusinessErrorToStatus } from '@framework/http/utils/mapBusinessErrorToStatus'

const router = Router()

function asyncRoute(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next)
  }
}

router.post(
  '/login',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(LoginOperator)
    const input = new InputLogin(req.body)
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(200).json(result.value)
  })
)

export const authRouter = router
