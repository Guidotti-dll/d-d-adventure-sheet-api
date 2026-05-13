import { type Either, left, right } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { injectable } from 'inversify'

export interface IChainError extends IError {
  step: string
  data: any
}

const handleFinishError = (data: any): IChainError => ({
  code: 'CHAIN-001',
  message: 'Error on handleFinish',
  shortMessage: 'ErrorOnHandleFinish',
  step: 'handleFinish method',
  data,
})

export interface IChainCallback {
  callback?(): Promise<void>
}

export interface IChainConfig {
  useExternalCallback?: boolean
}
export interface IChain<I extends IChainCallback> {
  setNext(handler: IChain<I>, config?: IChainConfig): IChain<I>
  addOnFinish(...callback: Array<() => Promise<void>>): void
  addOnFail(...callback: Array<() => Promise<void>>): void
  setConfig(data: IChainConfig): void

  handleFinish(data: I): Promise<Either<IChainError, I>>
  handle(data: I): Promise<Either<IChainError, I>>
  handleFail(error: IChainError): Promise<Either<IChainError, I>>
}

@injectable()
export abstract class Chain<I extends IChainCallback> implements IChain<I> {
  private nextHandler: IChain<I> | undefined
  private onFinish: Array<() => Promise<void>> = []
  private onFail: Array<() => Promise<void>> = []
  private config: IChainConfig

  public setNext(handler: IChain<I>, config?: IChainConfig): IChain<I> {
    this.nextHandler = handler
    if (config) this.setConfig(config)
    return handler
  }

  public setConfig(data: IChainConfig): void {
    this.config = { ...this.config, ...data }
  }

  public addOnFinish(...callbacks: Array<() => Promise<void>>): void {
    this.onFinish.push(...callbacks)
  }

  public addOnFail(...callbacks: Array<() => Promise<void>>): void {
    this.onFail.push(...callbacks)
  }

  private async runCallbacks(callbacks: Array<() => Promise<void>>): Promise<void> {
    for (const callback of callbacks) {
      await callback()
    }
    this.resetChain()
  }

  public async handle(request: I): Promise<Either<IChainError, I>> {
    if (this.nextHandler) {
      this.nextHandler.addOnFinish(...this.onFinish)
      this.nextHandler.addOnFail(...this.onFail)
      this.nextHandler.setConfig(this.config)
      this.resetChain()
      return await this.nextHandler.handle(request)
    }

    return this.handleFinish(request)
  }

  public async handleFinish(request: I): Promise<Either<IChainError, I>> {
    try {
      const callback = async (): Promise<void> => {
        await this.runCallbacks(this.onFinish)
      }

      if (this.config?.useExternalCallback) {
        request.callback = callback
      } else {
        await callback()
      }
      return right(request)
    } catch (error) {
      return left(handleFinishError(error))
    }
  }

  private resetChain(): void {
    this.config = {}
    this.onFinish = []
    this.onFail = []
  }

  public async handleFail(error: IChainError): Promise<Either<IChainError, I>> {
    await this.runCallbacks(this.onFail)
    return left(error)
  }
}
