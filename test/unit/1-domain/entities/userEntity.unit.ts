import { container } from '@test/utility/ioc'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'
import { UserEntity } from '@domain/entities/users/userEntity'

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
})
