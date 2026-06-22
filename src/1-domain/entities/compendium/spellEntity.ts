import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { type SchoolEnum, StatusEnum } from '@domain/entities/shared/enums'

export interface ISpell {
  id: string
  name: string
  level: number
  school: SchoolEnum
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
  ritual: boolean
  concentration: boolean
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateSpell = Optional<ISpell, 'ritual' | 'concentration' | 'status' | 'createdAt' | 'updatedAt'>

export class SpellEntity extends AbstractEntity<ISpell> {
  static create(props: InputCreateSpell): Either<IError, SpellEntity> {
    const spell = new SpellEntity({
      ...props,
      ritual: props.ritual ?? false,
      concentration: props.concentration ?? false,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(spell)
  }

  static fromExisting(props: ISpell): SpellEntity {
    return new SpellEntity(props)
  }

  isCantrip(): boolean {
    return this.props.level === 0
  }
}
