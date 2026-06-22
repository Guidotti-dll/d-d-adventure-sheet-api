import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface ICharacterProficiency {
  id: string
  characterId: string
  proficiencyId: string
  proficiencyName: string
  proficiencyType: 'SKILL' | 'SAVING_THROW' | 'WEAPON' | 'ARMOR' | 'TOOL'
  createdAt: Date
}

type InputCreateCharacterProficiency = Optional<ICharacterProficiency, 'createdAt'>

export class CharacterProficiencyEntity extends AbstractEntity<ICharacterProficiency> {
  static create(props: InputCreateCharacterProficiency): Either<IError, CharacterProficiencyEntity> {
    const proficiency = new CharacterProficiencyEntity({
      ...props,
      createdAt: new Date(),
    })
    return right(proficiency)
  }

  static fromExisting(props: ICharacterProficiency): CharacterProficiencyEntity {
    return new CharacterProficiencyEntity(props)
  }
}
