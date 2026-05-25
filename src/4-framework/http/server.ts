import 'reflect-metadata'
import 'source-map-support/register'
import 'dotenv/config'
import '@framework/ioc/inversify.config'

import { createExpressApp } from '@framework/http/expressApp'

const port = Number(process.env.PORT) || 3000
const app = createExpressApp()

const server = app.listen(port, () => {
  console.log(`HTTP listening on port ${port}`)
})

function shutdown(signal: string): void {
  console.log(`${signal} received, closing server`)
  server.close(() => process.exit(0))
}

process.on('SIGTERM', () => {
  shutdown('SIGTERM')
})
process.on('SIGINT', () => {
  shutdown('SIGINT')
})

export { app }
