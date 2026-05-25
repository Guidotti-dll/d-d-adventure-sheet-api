import { type InputCompare, type IEncryptService } from '@business/services/iEncryptService'
import { Left, Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { injectable } from 'inversify'
import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { ComparePasswordFailed, EncryptPasswordFailed } from '@business/errors/services/encryptService'

@injectable()
export class BcryptService implements IEncryptService {
  private readonly saltRounds = 10

  generateUuid(): string {
    return randomUUID()
  }

  async encrypt(value: string): Promise<Either<IError, string>> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const hash = await bcrypt.hash(value, salt)
      return new Right(hash)
    } catch (e) {
      console.log({ encryptPasswordError: e.message ?? e })
      return new Left(EncryptPasswordFailed)
    }
  }

  async compare(input: InputCompare): Promise<Either<IError, boolean>> {
    try {
      const isMatch = await bcrypt.compare(input.plain, input.encrypted)
      return new Right(isMatch)
    } catch (e) {
      console.log({ comparePasswordError: e.message ?? e })
      return new Left(ComparePasswordFailed)
    }
  }
}
