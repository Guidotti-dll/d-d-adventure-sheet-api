import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IBackground {
  id: string
  name: string
  description: string
  skillProficiencies: string[]
  toolProficiencies: string[]
  equipment: string[]
  trait: string
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateBackground = Optional<
  IBackground,
  'skillProficiencies' | 'toolProficiencies' | 'equipment' | 'status' | 'createdAt' | 'updatedAt'
>

export class BackgroundEntity extends AbstractEntity<IBackground> {
  static create(props: InputCreateBackground): Either<IError, BackgroundEntity> {
    const background = new BackgroundEntity({
      ...props,
      skillProficiencies: props.skillProficiencies ?? [],
      toolProficiencies: props.toolProficiencies ?? [],
      equipment: props.equipment ?? [],
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(background)
  }

  static fromExisting(props: IBackground): BackgroundEntity {
    return new BackgroundEntity(props)
  }
}
