import { injectable, inject } from 'inversify'
import { type IUserRepository } from '@business/repositories/users/iUserRepository'
import { UserTypes, type IUserEntity } from '@domain/entities/users/userEntity'
import { UserModel } from '@framework/models/users/userModel'
import { type FindOptionsWhere, In, Repository } from 'typeorm'
import { type DbTransaction } from '@framework/repositories/dbTransaction/dbTransaction'
import { type Pagination } from '@domain/common/dtos/paginationDto'
import { TypeormPagination } from '@framework/utility/typeorm/typeormPagination'

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject('UserModel') private userRepository: Repository<UserModel>) {}

  async findUserById(userId: string): Promise<IUserEntity | null> {
    const where = {
      id: userId,
    }
    return this.userRepository.findOne({ where, transaction: true })
  }

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return this.userRepository.findOne({ where: { email } })
  }

  async create(userEntity: IUserEntity, trx?: DbTransaction): Promise<IUserEntity> {
    const repository = trx ? await trx.getRepository(UserModel) : this.userRepository

    console.log({ userEntity })

    const user = repository.create({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      type: userEntity.type,
      status: userEntity.status,
      password: userEntity.password,
    })

    await repository.save(user)
    return user
  }

  async update(userEntity: IUserEntity, trx?: DbTransaction): Promise<IUserEntity> {
    const repository = trx ? await trx.getRepository(UserModel) : this.userRepository
    await repository.update({ id: userEntity.id }, userEntity)
    return userEntity
  }

  async listBy(): Promise<Pagination<IUserEntity>> {
    const where: FindOptionsWhere<UserModel> = {
      type: In(Object.values(UserTypes)),
    }

    const { items, pagination } = await TypeormPagination.getData<IUserEntity, UserModel>({
      repository: this.userRepository,
      limit: 10,
      page: 1,
      options: { where, order: { createdAt: 'DESC' } },
      serviceName: 'UserRepository',
      usingModel: true,
    })

    return { items, pagination }
  }
}
