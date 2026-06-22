import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IRacialBonus {
  attribute: string
  bonus: number
}

export interface IRace {
  id: string
  name: string
  description: string
  speed: number
  racialBonuses: IRacialBonus[]
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateRace = Optional<IRace, 'racialBonuses' | 'status' | 'createdAt' | 'updatedAt'>

export class RaceEntity extends AbstractEntity<IRace> {
  static create(props: InputCreateRace): Either<IError, RaceEntity> {
    const race = new RaceEntity({
      ...props,
      racialBonuses: props.racialBonuses ?? [],
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(race)
  }

  static fromExisting(props: IRace): RaceEntity {
    return new RaceEntity(props)
  }

  getBonusForAttribute(attribute: string): number {
    return this.props.racialBonuses.find((b) => b.attribute === attribute)?.bonus ?? 0
  }
}
