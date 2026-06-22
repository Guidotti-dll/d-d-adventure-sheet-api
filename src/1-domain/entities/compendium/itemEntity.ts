import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { type ItemTypeEnum, StatusEnum } from '@domain/entities/shared/enums'

export interface IItem {
  id: string
  name: string
  description: string
  type: ItemTypeEnum
  rarity: string
  weight: number
  value: number
  properties: string[]
  requiresAttunement: boolean
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateItem = Optional<IItem, 'properties' | 'requiresAttunement' | 'status' | 'createdAt' | 'updatedAt'>

export class ItemEntity extends AbstractEntity<IItem> {
  static create(props: InputCreateItem): Either<IError, ItemEntity> {
    const item = new ItemEntity({
      ...props,
      properties: props.properties ?? [],
      requiresAttunement: props.requiresAttunement ?? false,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(item)
  }

  static fromExisting(props: IItem): ItemEntity {
    return new ItemEntity(props)
  }
}
