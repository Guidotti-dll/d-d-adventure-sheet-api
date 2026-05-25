import { UserStatus, UserTypes } from '@domain/entities/users/userEntity'
import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateUserTable1692271704230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid ',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
          },

          {
            name: 'email',
            type: 'varchar',
            length: '200',
          },

          {
            name: 'password',
            type: 'varchar',
            length: '200',
          },

          {
            name: 'type',
            type: 'enum',
            enum: [UserTypes.USER, UserTypes.ADMIN],
          },
          {
            name: 'status',
            type: 'enum',
            enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
