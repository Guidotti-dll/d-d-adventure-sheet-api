import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { CampaignStatusEnum, StatusEnum } from '@domain/entities/shared/enums'

export interface ICampaign {
  id: string
  dungeonMasterId: string
  name: string
  description: string
  setting: string
  status: CampaignStatusEnum
  visibility: StatusEnum
  startedAt: Date
  updatedAt: Date
  createdAt: Date
}

type InputCreateCampaign = Optional<ICampaign, 'visibility' | 'status' | 'startedAt' | 'createdAt' | 'updatedAt'>

export class CampaignEntity extends AbstractEntity<ICampaign> {
  static create(props: InputCreateCampaign): Either<IError, CampaignEntity> {
    const campaign = new CampaignEntity({
      ...props,
      status: props.status ?? CampaignStatusEnum.PLANNING,
      visibility: props.visibility ?? StatusEnum.ACTIVE,
      startedAt: props.startedAt ?? new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(campaign)
  }

  static fromExisting(props: ICampaign): CampaignEntity {
    return new CampaignEntity(props)
  }

  start(): CampaignEntity {
    return new CampaignEntity({
      ...this.props,
      status: CampaignStatusEnum.ONGOING,
      startedAt: new Date(),
      updatedAt: new Date(),
    })
  }

  pause(): CampaignEntity {
    return new CampaignEntity({
      ...this.props,
      status: CampaignStatusEnum.PAUSED,
      updatedAt: new Date(),
    })
  }

  complete(): CampaignEntity {
    return new CampaignEntity({
      ...this.props,
      status: CampaignStatusEnum.COMPLETED,
      updatedAt: new Date(),
    })
  }

  cancel(): CampaignEntity {
    return new CampaignEntity({
      ...this.props,
      status: CampaignStatusEnum.CANCELLED,
      updatedAt: new Date(),
    })
  }

  isActive(): boolean {
    return this.props.status === CampaignStatusEnum.ONGOING
  }
}
