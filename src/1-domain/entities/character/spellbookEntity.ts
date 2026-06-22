import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface ISpellbookEntry {
  id: string
  name: string
  level: number
  school: string
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
}

export interface ISpellbook {
  id: string
  characterId: string
  spells: ISpellbookEntry[]
  cantrips: ISpellbookEntry[]
  createdAt: Date
  updatedAt: Date
}

type InputCreateSpellbook = Optional<ISpellbook, 'spells' | 'cantrips' | 'createdAt' | 'updatedAt'>

export class SpellbookEntity extends AbstractEntity<ISpellbook> {
  static create(props: InputCreateSpellbook): Either<IError, SpellbookEntity> {
    const spellbook = new SpellbookEntity({
      ...props,
      spells: props.spells ?? [],
      cantrips: props.cantrips ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(spellbook)
  }

  static fromExisting(props: ISpellbook): SpellbookEntity {
    return new SpellbookEntity(props)
  }

  addSpell(spell: ISpellbookEntry): SpellbookEntity {
    const spells = spell.level === 0 ? [...this.props.cantrips, spell] : [...this.props.spells, spell]
    return new SpellbookEntity({
      ...this.props,
      [spell.level === 0 ? 'cantrips' : 'spells']: spells,
      updatedAt: new Date(),
    })
  }

  removeSpell(spellId: string): SpellbookEntity {
    return new SpellbookEntity({
      ...this.props,
      spells: this.props.spells.filter(s => s.id !== spellId),
      cantrips: this.props.cantrips.filter(s => s.id !== spellId),
      updatedAt: new Date(),
    })
  }

  getSpellsByLevel(level: number): ISpellbookEntry[] {
    return level === 0 ? this.props.cantrips : this.props.spells.filter(s => s.level === level)
  }
}
