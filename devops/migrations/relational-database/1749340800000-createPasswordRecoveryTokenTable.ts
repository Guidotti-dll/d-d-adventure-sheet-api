import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePasswordRecoveryTokenTable1749340800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'password_recovery_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'token',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'used',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )

    await queryRunner.createForeignKey(
      'password_recovery_tokens',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('password_recovery_tokens')
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('user_id'))

    if (foreignKey) {
      await queryRunner.dropForeignKey('password_recovery_tokens', foreignKey)
    }

    await queryRunner.dropTable('password_recovery_tokens')
  }
}
