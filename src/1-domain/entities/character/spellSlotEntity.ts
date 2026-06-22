import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface ISpellSlot {
  id: string
  characterId: string
  level: number
  total: number
  used: number
  createdAt: Date
  updatedAt: Date
}

type InputCreateSpellSlot = Optional<ISpellSlot, 'used' | 'createdAt' | 'updatedAt'>

export class SpellSlotEntity extends AbstractEntity<ISpellSlot> {
  static create(props: InputCreateSpellSlot): Either<IError, SpellSlotEntity> {
    const slot = new SpellSlotEntity({
      ...props,
      used: props.used ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(slot)
  }

  static fromExisting(props: ISpellSlot): SpellSlotEntity {
    return new SpellSlotEntity(props)
  }

  getAvailable(): number {
    return this.props.total - this.props.used
  }

  canCastSpell(): boolean {
    return this.getAvailable() > 0
  }

  useSlot(): Either<IError, SpellSlotEntity> {
    if (!this.canCastSpell()) {
      return right(this)
    }
    return right(
      new SpellSlotEntity({
        ...this.props,
        used: this.props.used + 1,
        updatedAt: new Date(),
      })
    )
  }

  restoreSlots(): SpellSlotEntity {
    return new SpellSlotEntity({
      ...this.props,
      used: 0,
      updatedAt: new Date(),
    })
  }
}
