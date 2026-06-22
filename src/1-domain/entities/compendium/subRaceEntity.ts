import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface ISubRace {
  id: string
  raceId: string
  name: string
  description: string
  traitIds: string[]
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateSubRace = Optional<ISubRace, 'traitIds' | 'status' | 'createdAt' | 'updatedAt'>

export class SubRaceEntity extends AbstractEntity<ISubRace> {
  static create(props: InputCreateSubRace): Either<IError, SubRaceEntity> {
    const subrace = new SubRaceEntity({
      ...props,
      traitIds: props.traitIds ?? [],
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(subrace)
  }

  static fromExisting(props: ISubRace): SubRaceEntity {
    return new SubRaceEntity(props)
  }

  addTrait(traitId: string): SubRaceEntity {
    return new SubRaceEntity({
      ...this.props,
      traitIds: [...this.props.traitIds, traitId],
      updatedAt: new Date(),
    })
  }

  removeTrait(traitId: string): SubRaceEntity {
    return new SubRaceEntity({
      ...this.props,
      traitIds: this.props.traitIds.filter((id) => id !== traitId),
      updatedAt: new Date(),
    })
  }
}
