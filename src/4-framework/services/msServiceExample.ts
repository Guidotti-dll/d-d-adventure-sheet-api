import { inject, injectable } from 'inversify'
import axios, { type AxiosInstance } from 'axios'
import { left, right } from '@domain/common/utility/either'
import { type ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type OutputGetData, type IMsServiceExample } from '@business/services/iMsServiceExample'
import { unknownError } from '@domain/common/module/errors/general'

@injectable()
export class MsServiceExample implements IMsServiceExample {
  private axios: AxiosInstance

  constructor(@inject(ILoggerServiceToken) private loggerService: ILoggerService) {
    this.axios = axios.create({
      // baseURL: process.env.PRIVATE_API_GATEWAY_URL,
    })
    // this.axios.interceptors.request.use(privateApiInterceptor)
  }

  async getData(): Promise<OutputGetData> {
    try {
      const url = `/private/path`
      const response = await this.axios.get<any[]>(url)

      this.loggerService.info({ response: response.data })

      return right(response.data)
    } catch (error) {
      return left(unknownError)
    }
  }
}
