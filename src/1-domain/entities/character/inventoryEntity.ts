import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface IInventory {
  id: string
  characterId: string
  capacity: number
  currentWeight: number
  gold: number
  createdAt: Date
  updatedAt: Date
}

type InputCreateInventory = Optional<IInventory, 'currentWeight' | 'createdAt' | 'updatedAt'>

export class InventoryEntity extends AbstractEntity<IInventory> {
  static create(props: InputCreateInventory): Either<IError, InventoryEntity> {
    const inventory = new InventoryEntity({
      ...props,
      currentWeight: props.currentWeight ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(inventory)
  }

  static fromExisting(props: IInventory): InventoryEntity {
    return new InventoryEntity(props)
  }

  canAddWeight(weight: number): boolean {
    return this.props.currentWeight + weight <= this.props.capacity
  }

  updateWeight(weight: number): InventoryEntity {
    return new InventoryEntity({
      ...this.props,
      currentWeight: weight,
      updatedAt: new Date(),
    })
  }

  updateGold(gold: number): InventoryEntity {
    return new InventoryEntity({
      ...this.props,
      gold,
      updatedAt: new Date(),
    })
  }
}
