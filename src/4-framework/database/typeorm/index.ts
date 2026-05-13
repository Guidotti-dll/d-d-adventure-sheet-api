import { UserModel } from '@framework/models/users/userModel'
import 'dotenv/config'
import { DataSource, type DataSourceOptions } from 'typeorm'

import { type PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'

const defaultPort = 5432
const port = Number(process.env.DB_PORT) || defaultPort
const masterHost = process.env.DB_HOST || 'localhost'
const readerHost = process.env.DB_READER_HOST
const credentials = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'postgres',
}

const master: PostgresConnectionCredentialsOptions = {
  host: masterHost,
  port,
  ...credentials,
}

const slaves: PostgresConnectionCredentialsOptions[] = []

if (readerHost) {
  slaves.push({
    host: readerHost,
    port: Number(process.env.DB_READER_PORT) || port,
    ...credentials,
  })
}

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  entities: [UserModel],
  host: masterHost,
  replication: {
    master, // Write queries
    slaves, // Read queries
  },
}

export const AppDataSource = new DataSource(dataSourceConfig)
