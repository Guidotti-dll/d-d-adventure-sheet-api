import { injectable, inject } from 'inversify'
import { type IPasswordRecoveryTokenRepository } from '@business/repositories/auth/iPasswordRecoveryTokenRepository'
import { type IPasswordRecoveryTokenEntity } from '@domain/entities/auth/passwordRecoveryTokenEntity'
import { PasswordRecoveryTokenModel } from '@framework/models/auth/passwordRecoveryTokenModel'
import { type DbTransaction } from '@framework/repositories/dbTransaction/dbTransaction'
import { type Repository } from 'typeorm'

@injectable()
export class PasswordRecoveryTokenRepository implements IPasswordRecoveryTokenRepository {
  public constructor(
    @inject('PasswordRecoveryTokenModel')
    private passwordRecoveryTokenRepository: Repository<PasswordRecoveryTokenModel>
  ) {}

  async create(tokenEntity: IPasswordRecoveryTokenEntity, trx?: DbTransaction): Promise<IPasswordRecoveryTokenEntity> {
    const repository = trx ? await trx.getRepository(PasswordRecoveryTokenModel) : this.passwordRecoveryTokenRepository

    const token = repository.create({
      id: tokenEntity.id,
      userId: tokenEntity.userId,
      token: tokenEntity.token,
      expiresAt: tokenEntity.expiresAt,
      used: tokenEntity.used,
    })

    await repository.save(token)
    return token
  }

  async findByToken(token: string): Promise<IPasswordRecoveryTokenEntity | null> {
    return this.passwordRecoveryTokenRepository.findOne({ where: { token } })
  }

  async invalidateUnusedByUserId(userId: string, trx?: DbTransaction): Promise<void> {
    const repository = trx ? await trx.getRepository(PasswordRecoveryTokenModel) : this.passwordRecoveryTokenRepository

    await repository.update({ userId, used: false }, { used: true })
  }

  async markAsUsed(id: string, trx?: DbTransaction): Promise<void> {
    const repository = trx ? await trx.getRepository(PasswordRecoveryTokenModel) : this.passwordRecoveryTokenRepository

    await repository.update({ id }, { used: true })
  }
}
