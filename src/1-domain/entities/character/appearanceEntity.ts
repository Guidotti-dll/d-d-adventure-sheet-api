import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface IAppearance {
  age: number
  height: string
  weight: string
  eyeColor: string
  skinTone: string
  hairColor: string
  distinctiveFeatures: string
}

export class AppearanceEntity extends AbstractEntity<IAppearance> {
  static create(props: IAppearance): Either<IError, AppearanceEntity> {
    const appearance = new AppearanceEntity(props)
    return right(appearance)
  }

  updateFeature(feature: keyof IAppearance, value: string | number): AppearanceEntity {
    return new AppearanceEntity({
      ...this.props,
      [feature]: value,
    })
  }
}
