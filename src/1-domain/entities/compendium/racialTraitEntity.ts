import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IRacialTrait {
  id: string
  raceId: string
  name: string
  description: string
  status: StatusEnum
  createdAt: Date
}

type InputCreateRacialTrait = Optional<IRacialTrait, 'status' | 'createdAt'>

export class RacialTraitEntity extends AbstractEntity<IRacialTrait> {
  static create(props: InputCreateRacialTrait): Either<IError, RacialTraitEntity> {
    const trait = new RacialTraitEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
    })
    return right(trait)
  }

  static fromExisting(props: IRacialTrait): RacialTraitEntity {
    return new RacialTraitEntity(props)
  }
}
