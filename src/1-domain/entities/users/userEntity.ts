import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, left, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import * as userErrors from '@domain/errors/user'

export enum UserTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUserEntity {
  id?: number
  name: string
  email: string
  password: string
  type: UserTypes
  createdAt: Date
  updatedAt: Date
}

type InputCreateUserEntity = Optional<IUserEntity, 'createdAt' | 'updatedAt' | 'type'>

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: InputCreateUserEntity): Either<IError, UserEntity> {
    const domain = 'example.com'
    if (props.email.split('@')[1] !== domain) {
      return left(userErrors.invalidEmailDomainError)
    }

    const user = new UserEntity({
      type: UserTypes.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...props,
    })

    return right(user)
  }
}
