import { dataSourceConfig } from '@framework/database/typeorm'
import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  ...dataSourceConfig,
  migrationsTableName: 'migrations',
  migrations: ['devops/migrations/relational-database/*.ts'],
})
