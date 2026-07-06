import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { CampaignStatusEnum } from '@domain/entities/shared/enums/campaignStatus.enum'
import { StatusEnum } from '@domain/entities/shared/enums/status.enum'

@Entity({ name: 'campaigns' })
export class CampaignModel implements ICampaign {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'dungeon_master_id' })
  dungeonMasterId!: string

  @Column()
  name!: string

  @Column({ type: 'text', nullable: true })
  description!: string

  @Column({ nullable: true })
  setting!: string

  @Column({ type: 'enum', enum: Object.values(CampaignStatusEnum) })
  status!: CampaignStatusEnum

  @Column({ type: 'enum', enum: Object.values(StatusEnum) })
  visibility!: StatusEnum

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
