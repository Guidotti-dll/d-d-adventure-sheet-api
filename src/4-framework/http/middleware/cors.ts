import { type NextFunction, type Request, type Response } from 'express'

const defaultOrigins = ['http://localhost:3000', 'http://localhost:3001']

function getAllowedOrigins(): string[] {
  if (!process.env.FRONTEND_URL) {
    return defaultOrigins
  }

  return process.env.FRONTEND_URL.split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
}

export function cors(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin
  const allowedOrigins = getAllowedOrigins()

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }

  next()
}
