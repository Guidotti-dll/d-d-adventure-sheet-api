import { type NextFunction, type Request, type Response } from 'express'
import { tokenMissing } from '@business/errors/auth/auth'
import { type IJwtService, IJwtServiceToken } from '@business/services/iJwtService'
import { mapBusinessErrorToStatus } from '@framework/http/utils/mapBusinessErrorToStatus'
import { container } from '@shared/ioc/container'

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  void (async () => {
    const header = req.headers.authorization

    if (!header?.startsWith('Bearer ')) {
      res.status(401).json({ error: tokenMissing })
      return
    }

    const token = header.slice('Bearer '.length).trim()

    if (!token) {
      res.status(401).json({ error: tokenMissing })
      return
    }

    const jwtService = await container.getAsync<IJwtService>(IJwtServiceToken)
    const result = await jwtService.verifyToken(token)

    if (result.isLeft()) {
      const status = mapBusinessErrorToStatus(result.value)
      res.status(status).json({ error: result.value })
      return
    }

    req.auth = result.value
    next()
  })().catch(next)
}
