import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'

export interface IPasswordRecoveryTokenEntity {
  id: string
  userId: string
  token: string
  expiresAt: Date
  used: boolean
  createdAt: Date
}

type InputCreatePasswordRecoveryTokenEntity = Optional<IPasswordRecoveryTokenEntity, 'used' | 'createdAt'>

export class PasswordRecoveryTokenEntity extends AbstractEntity<IPasswordRecoveryTokenEntity> {
  static create(props: InputCreatePasswordRecoveryTokenEntity): Either<IError, PasswordRecoveryTokenEntity> {
    const entity = new PasswordRecoveryTokenEntity({
      ...props,
      used: props.used ?? false,
      createdAt: props.createdAt ?? new Date(),
    })

    return right(entity)
  }

  static fromExisting(props: IPasswordRecoveryTokenEntity): PasswordRecoveryTokenEntity {
    return new PasswordRecoveryTokenEntity(props)
  }

  isExpired(): boolean {
    return this.props.expiresAt.getTime() <= Date.now()
  }

  isValid(): boolean {
    return !this.props.used && !this.isExpired()
  }
}
