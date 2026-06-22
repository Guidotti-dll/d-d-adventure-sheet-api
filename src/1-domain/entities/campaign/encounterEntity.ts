import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { EncounterTypeEnum, DifficultyEnum, StatusEnum } from '@domain/entities/shared/enums'

export interface IEncounter {
  id: string
  sessionId: string
  name: string
  description: string
  type: EncounterTypeEnum
  difficulty: DifficultyEnum
  participantIds: string[]
  xpReward: number
  completed: boolean
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateEncounter = Optional<
  IEncounter,
  'participantIds' | 'completed' | 'status' | 'createdAt' | 'updatedAt'
>

export class EncounterEntity extends AbstractEntity<IEncounter> {
  static create(props: InputCreateEncounter): Either<IError, EncounterEntity> {
    const encounter = new EncounterEntity({
      ...props,
      participantIds: props.participantIds ?? [],
      completed: props.completed ?? false,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(encounter)
  }

  static fromExisting(props: IEncounter): EncounterEntity {
    return new EncounterEntity(props)
  }

  addParticipant(characterId: string): EncounterEntity {
    return new EncounterEntity({
      ...this.props,
      participantIds: [...this.props.participantIds, characterId],
      updatedAt: new Date(),
    })
  }

  removeParticipant(characterId: string): EncounterEntity {
    return new EncounterEntity({
      ...this.props,
      participantIds: this.props.participantIds.filter((id) => id !== characterId),
      updatedAt: new Date(),
    })
  }

  complete(): EncounterEntity {
    return new EncounterEntity({
      ...this.props,
      completed: true,
      updatedAt: new Date(),
    })
  }
}
