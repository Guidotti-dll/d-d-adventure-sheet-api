import { container } from '@test/utility/ioc'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'
import { UserEntity } from '@domain/entities/users/userEntity'
import { invalidEmailDomainError } from '@domain/errors/user'

describe('1-domain.entities.users.userEntity', () => {
  beforeEach(() => {
    container.snapshot()
  })

  afterEach(() => {
    container.restore()
  })

  test('create successful', async () => {
    expect.assertions(5)
    const userEntity = UserEntity.create(fakeUserEntity)
    if (userEntity.isRight()) {
      const userExported = userEntity.value.export()
      expect(userExported.name).toBe(fakeUserEntity.name)
      expect(userExported.email).toBe(fakeUserEntity.email)
      expect(userExported.password).toBe(fakeUserEntity.password)
      expect(userExported.type).toBe(fakeUserEntity.type)
      expect(userExported.createdAt).toBeDefined()
    }
  })

  test('invalid email', async () => {
    expect.assertions(1)
    const userEntity = UserEntity.create({
      ...fakeUserEntity,
      email: 'teste@test.com',
    })
    if (userEntity.isLeft()) {
      expect(userEntity.value).toBe(invalidEmailDomainError)
    }
  })
})
