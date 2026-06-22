import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum, type AlignmentEnum } from '@domain/entities/shared/enums'

export interface ICharacter {
  id: string
  userId: string
  name: string
  raceId: string
  classId: string
  backgroundId: string
  level: number
  experience: number
  healthPoints: number
  maxHealthPoints: number
  armorClass: number
  proficiencyBonus: number
  alignment: AlignmentEnum
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  features: string
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateCharacter = Optional<
  ICharacter,
  | 'level'
  | 'experience'
  | 'healthPoints'
  | 'proficiencyBonus'
  | 'personalityTraits'
  | 'ideals'
  | 'bonds'
  | 'flaws'
  | 'features'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
>

export class CharacterEntity extends AbstractEntity<ICharacter> {
  static create(props: InputCreateCharacter): Either<IError, CharacterEntity> {
    const character = new CharacterEntity({
      ...props,
      level: props.level ?? 1,
      experience: props.experience ?? 0,
      healthPoints: props.healthPoints ?? props.maxHealthPoints,
      proficiencyBonus: props.proficiencyBonus ?? 2,
      personalityTraits: props.personalityTraits ?? '',
      ideals: props.ideals ?? '',
      bonds: props.bonds ?? '',
      flaws: props.flaws ?? '',
      features: props.features ?? '',
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(character)
  }

  static fromExisting(props: ICharacter): CharacterEntity {
    return new CharacterEntity(props)
  }

  gainExperience(amount: number): CharacterEntity {
    return new CharacterEntity({
      ...this.props,
      experience: this.props.experience + amount,
      updatedAt: new Date(),
    })
  }

  levelUp(): CharacterEntity {
    const newLevel = this.props.level + 1
    const newProficiencyBonus = Math.ceil((newLevel + 7) / 4)
    return new CharacterEntity({
      ...this.props,
      level: newLevel,
      proficiencyBonus: newProficiencyBonus,
      updatedAt: new Date(),
    })
  }

  takeDamage(amount: number): CharacterEntity {
    const newHp = Math.max(0, this.props.healthPoints - amount)
    return new CharacterEntity({
      ...this.props,
      healthPoints: newHp,
      updatedAt: new Date(),
    })
  }

  heal(amount: number): CharacterEntity {
    const newHp = Math.min(this.props.maxHealthPoints, this.props.healthPoints + amount)
    return new CharacterEntity({
      ...this.props,
      healthPoints: newHp,
      updatedAt: new Date(),
    })
  }

  isAlive(): boolean {
    return this.props.healthPoints > 0
  }
}
