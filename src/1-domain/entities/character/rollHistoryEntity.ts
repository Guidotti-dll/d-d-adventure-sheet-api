import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface IRoll {
  diceType: string
  result: number
  timestamp: Date
  context: string
}

export interface IRollHistory {
  id: string
  characterId: string
  rolls: IRoll[]
  createdAt: Date
  updatedAt: Date
}

type InputCreateRollHistory = Optional<IRollHistory, 'rolls' | 'createdAt' | 'updatedAt'>

export class RollHistoryEntity extends AbstractEntity<IRollHistory> {
  static create(props: InputCreateRollHistory): Either<IError, RollHistoryEntity> {
    const rollHistory = new RollHistoryEntity({
      ...props,
      rolls: props.rolls ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(rollHistory)
  }

  static fromExisting(props: IRollHistory): RollHistoryEntity {
    return new RollHistoryEntity(props)
  }

  addRoll(roll: IRoll): RollHistoryEntity {
    return new RollHistoryEntity({
      ...this.props,
      rolls: [...this.props.rolls, roll],
      updatedAt: new Date(),
    })
  }

  getLastRolls(count: number): IRoll[] {
    return this.props.rolls.slice(-count)
  }

  getAverageRoll(): number {
    if (this.props.rolls.length === 0) return 0
    const sum = this.props.rolls.reduce((acc, roll) => acc + roll.result, 0)
    return sum / this.props.rolls.length
  }
}
