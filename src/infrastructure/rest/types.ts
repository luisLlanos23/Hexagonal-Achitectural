import { AxiosRequestConfig } from 'axios'

export type Endpoint = {
  url: string
  actions: {
      method: Lowercase<Exclude<AxiosRequestConfig['method'], undefined>>
      func: (...args: any[]) => void
  }[]
}