import { AbstractEntity } from '@domain/common/entities/abstractEntity'
import { type Either, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Optional } from '@domain/common/utility/utilityTypes'
import { StatusEnum } from '@domain/entities/shared/enums'

export interface ICampaignJournal {
  id: string
  characterId: string
  campaignId: string
  content: string
  date: Date
  status: StatusEnum
  createdAt: Date
  updatedAt: Date
}

type InputCreateCampaignJournal = Optional<ICampaignJournal, 'status' | 'createdAt' | 'updatedAt'>

export class CampaignJournalEntity extends AbstractEntity<ICampaignJournal> {
  static create(props: InputCreateCampaignJournal): Either<IError, CampaignJournalEntity> {
    const journal = new CampaignJournalEntity({
      ...props,
      status: props.status ?? StatusEnum.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return right(journal)
  }

  static fromExisting(props: ICampaignJournal): CampaignJournalEntity {
    return new CampaignJournalEntity(props)
  }

  updateContent(content: string): CampaignJournalEntity {
    return new CampaignJournalEntity({
      ...this.props,
      content,
      updatedAt: new Date(),
    })
  }
}
