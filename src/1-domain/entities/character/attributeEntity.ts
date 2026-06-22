import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type AttributeEnum } from '@domain/entities/shared/enums'

export interface IAttributeValue {
  score: number
  modifier: number
}

export interface IAttribute {
  strength: IAttributeValue
  dexterity: IAttributeValue
  constitution: IAttributeValue
  intelligence: IAttributeValue
  wisdom: IAttributeValue
  charisma: IAttributeValue
}

export class AttributeEntity extends AbstractEntity<IAttribute> {
  static create(props: IAttribute): Either<IError, AttributeEntity> {
    const attribute = new AttributeEntity(props)
    return right(attribute)
  }

  static default(): Either<IError, AttributeEntity> {
    return AttributeEntity.create({
      strength: { score: 10, modifier: 0 },
      dexterity: { score: 10, modifier: 0 },
      constitution: { score: 10, modifier: 0 },
      intelligence: { score: 10, modifier: 0 },
      wisdom: { score: 10, modifier: 0 },
      charisma: { score: 10, modifier: 0 },
    })
  }

  getModifier(attribute: AttributeEnum): number {
    return this.props[attribute.toLowerCase() as keyof IAttribute].modifier
  }

  updateScore(attribute: AttributeEnum, score: number): AttributeEntity {
    const modifier = Math.floor((score - 10) / 2)
    return new AttributeEntity({
      ...this.props,
      [attribute.toLowerCase()]: { score, modifier },
    })
  }
}
