import { type NextFunction, type Request, type Response } from 'express'

/**
 * Cabeçalho opcional `x-permissions`: lista separada por vírgulas com permissões concedidas.
 * Em desenvolvimento, defina `SKIP_PERMISSION_CHECK=true` para ignorar.
 */
export function requirePermissions(...required: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (process.env.SKIP_PERMISSION_CHECK === 'true') {
      next()
      return
    }

    const raw = req.headers['x-permissions']
    const granted = typeof raw === 'string' ? raw.split(',').map(s => s.trim()) : []
    const ok = required.every(p => granted.includes(p))

    if (!ok) {
      res.status(403).json({ message: 'Forbidden' })
      return
    }

    next()
  }
}
