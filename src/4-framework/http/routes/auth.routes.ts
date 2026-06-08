import { Router, type Request, type Response, type NextFunction } from 'express'
import { container } from '@shared/ioc/container'
import { LoginOperator } from '@controller/operations/auth/loginOperator'
import { RequestPasswordRecoveryOperator } from '@controller/operations/auth/requestPasswordRecoveryOperator'
import { ResetPasswordOperator } from '@controller/operations/auth/resetPasswordOperator'
import { InputLogin } from '@controller/serializers/auth/loginSerializer'
import { InputRequestPasswordRecovery } from '@controller/serializers/auth/requestPasswordRecoverySerializer'
import { InputResetPassword } from '@controller/serializers/auth/resetPasswordSerializer'
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

router.post(
  '/forgot-password',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(RequestPasswordRecoveryOperator)
    const input = new InputRequestPasswordRecovery(req.body)
    const result = await operator.exec(input)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    res.status(200).json(result.value)
  })
)

router.post(
  '/reset-password',
  asyncRoute(async (req, res) => {
    const operator = await container.getAsync(ResetPasswordOperator)
    const input = new InputResetPassword(req.body)
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
