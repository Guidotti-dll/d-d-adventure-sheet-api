import { CampaignStatusEnum } from '@domain/entities/shared/enums/campaignStatus.enum'
import { StatusEnum } from '@domain/entities/shared/enums/status.enum'
import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateCampaignTable1750000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campaigns',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'dungeon_master_id', type: 'uuid' },
          { name: 'name', type: 'varchar', length: '200' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'setting', type: 'varchar', length: '200', isNullable: true },
          {
            name: 'status',
            type: 'enum',
            enum: [
              CampaignStatusEnum.PLANNING,
              CampaignStatusEnum.ONGOING,
              CampaignStatusEnum.PAUSED,
              CampaignStatusEnum.COMPLETED,
              CampaignStatusEnum.CANCELLED,
            ],
          },
          { name: 'visibility', type: 'enum', enum: [StatusEnum.ACTIVE, StatusEnum.INACTIVE, StatusEnum.DELETED] },
          { name: 'started_at', type: 'timestamp', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      })
    )

    await queryRunner.createForeignKey(
      'campaigns',
      new TableForeignKey({
        columnNames: ['dungeon_master_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('campaigns')
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('dungeon_master_id'))
    if (foreignKey) {
      await queryRunner.dropForeignKey('campaigns', foreignKey)
    }
    await queryRunner.dropTable('campaigns')
  }
}
