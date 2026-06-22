import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface IClassFeature {
  id: string
  classId: string
  name: string
  description: string
  level: number
  status: StatusEnum
  createdAt: Date
}

type InputCreateClassFeature = Optional<IClassFeature, 'status' | 'createdAt'>

export class ClassFeatureEntity extends AbstractEntity<IClassFeature> {
  static create(props: InputCreateClassFeature): Either<IError, ClassFeatureEntity> {
    const feature = new ClassFeatureEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
    })
    return right(feature)
  }

  static fromExisting(props: IClassFeature): ClassFeatureEntity {
    return new ClassFeatureEntity(props)
  }
}
