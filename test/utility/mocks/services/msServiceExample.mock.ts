import { type Container } from 'inversify'
import { right } from '@domain/common/utility/either'
import { type IMsServiceExample, IMsServiceExampleToken } from '@business/services/iMsServiceExample'

export const msServiceExampleMock: jest.Mocked<IMsServiceExample> = {
  getData: jest.fn().mockResolvedValue(right([])),
}

export function mockMsServiceExample(container: Container): void {
  container.bind<IMsServiceExample>(IMsServiceExampleToken).toConstantValue(msServiceExampleMock)
}
