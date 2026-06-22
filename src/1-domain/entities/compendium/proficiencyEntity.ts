import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IProficiency {
  id: string
  name: string
  type: 'SKILL' | 'SAVING_THROW' | 'WEAPON' | 'ARMOR' | 'TOOL'
  description: string
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateProficiency = Optional<IProficiency, 'status' | 'createdAt' | 'updatedAt'>

export class ProficiencyEntity extends AbstractEntity<IProficiency> {
  static create(props: InputCreateProficiency): Either<IError, ProficiencyEntity> {
    const proficiency = new ProficiencyEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(proficiency)
  }

  static fromExisting(props: IProficiency): ProficiencyEntity {
    return new ProficiencyEntity(props)
  }
}
