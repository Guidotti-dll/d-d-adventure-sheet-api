import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IParticipation {
  id: string
  campaignId: string
  characterId: string
  joinedAt: Date
  leftAt: Date | null
  active: boolean
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateParticipation = Optional<
  IParticipation,
  'leftAt' | 'active' | 'status' | 'createdAt' | 'updatedAt'
>

export class ParticipationEntity extends AbstractEntity<IParticipation> {
  static create(props: InputCreateParticipation): Either<IError, ParticipationEntity> {
    const participation = new ParticipationEntity({
      ...props,
      leftAt: props.leftAt ?? null,
      active: props.active ?? true,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(participation)
  }

  static fromExisting(props: IParticipation): ParticipationEntity {
    return new ParticipationEntity(props)
  }

  leave(): ParticipationEntity {
    return new ParticipationEntity({
      ...this.props,
      active: false,
      leftAt: new Date(),
      updatedAt: new Date(),
    })
  }

  rejoin(): ParticipationEntity {
    return new ParticipationEntity({
      ...this.props,
      active: true,
      leftAt: null,
      updatedAt: new Date(),
    })
  }
}
