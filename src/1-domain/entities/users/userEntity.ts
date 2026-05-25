import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export enum UserTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUserEntity {
  id: string
  name: string
  email: string
  password: string
  status: UserStatus
  type: UserTypes
  createdAt: Date
  updatedAt: Date
}

type InputCreateUserEntity = Optional<IUserEntity, 'createdAt' | 'updatedAt' | 'type' | 'status'>

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: InputCreateUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity({
      ...props,
      type: UserTypes.USER,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return right(user)
  }
}
