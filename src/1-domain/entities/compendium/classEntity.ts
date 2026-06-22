import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IClass {
  id: string
  name: string
  description: string
  hitDice: string
  primaryAttribute: string
  savingThrows: string[]
  featureIds: string[]
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateClass = Optional<IClass, 'savingThrows' | 'featureIds' | 'status' | 'createdAt' | 'updatedAt'>

export class ClassEntity extends AbstractEntity<IClass> {
  static create(props: InputCreateClass): Either<IError, ClassEntity> {
    const classEntity = new ClassEntity({
      ...props,
      savingThrows: props.savingThrows ?? [],
      featureIds: props.featureIds ?? [],
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(classEntity)
  }

  static fromExisting(props: IClass): ClassEntity {
    return new ClassEntity(props)
  }

  addFeature(featureId: string): ClassEntity {
    return new ClassEntity({
      ...this.props,
      featureIds: [...this.props.featureIds, featureId],
      updatedAt: new Date(),
    })
  }

  removeFeature(featureId: string): ClassEntity {
    return new ClassEntity({
      ...this.props,
      featureIds: this.props.featureIds.filter((id) => id !== featureId),
      updatedAt: new Date(),
    })
  }
}
