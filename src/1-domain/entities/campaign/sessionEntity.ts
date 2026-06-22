import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface ISession {
  id: string
  campaignId: string
  number: number
  title: string
  summary: string
  date: Date
  duration: number
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateSession = Optional<ISession, 'status' | 'createdAt' | 'updatedAt'>

export class SessionEntity extends AbstractEntity<ISession> {
  static create(props: InputCreateSession): Either<IError, SessionEntity> {
    const session = new SessionEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(session)
  }

  static fromExisting(props: ISession): SessionEntity {
    return new SessionEntity(props)
  }

  updateSummary(summary: string): SessionEntity {
    return new SessionEntity({
      ...this.props,
      summary,
      updatedAt: new Date(),
    })
  }
}
