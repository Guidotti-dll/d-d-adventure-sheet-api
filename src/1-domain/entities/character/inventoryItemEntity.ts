import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type ItemTypeEnum, StatusEnum } from '@domain/entities/shared/enums'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface IInventoryItem {
  id: string
  name: string
  description: string
  type: ItemTypeEnum
  quantity: number
  weight: number
  rarity: string
  value: number
  equipped: boolean
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateInventoryItem = Optional<IInventoryItem, 'status' | 'createdAt' | 'updatedAt' | 'equipped'>

export class InventoryItemEntity extends AbstractEntity<IInventoryItem> {
  static create(props: InputCreateInventoryItem): Either<IError, InventoryItemEntity> {
    const item = new InventoryItemEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      equipped: props.equipped ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(item)
  }

  static fromExisting(props: IInventoryItem): InventoryItemEntity {
    return new InventoryItemEntity(props)
  }

  equip(): InventoryItemEntity {
    return new InventoryItemEntity({ ...this.props, equipped: true })
  }

  unequip(): InventoryItemEntity {
    return new InventoryItemEntity({ ...this.props, equipped: false })
  }

  updateQuantity(quantity: number): InventoryItemEntity {
    return new InventoryItemEntity({
      ...this.props,
      quantity,
      updatedAt: new Date(),
    })
  }
}
