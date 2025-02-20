import logger from '@/common/utils/logger'
import { isServer } from '@/common/utils/env'
import config from '@/config'
import { ERROR_CLIENT_CODE } from '@/common/constants/errorCode'

export type ObjectType = object
export interface AjaxResponse<T extends ObjectType = ObjectType> {
  flag: 0 | 1
  data?: T
  msg?: string
  code: string
}

export type MethodType = 'get' | 'post'

interface DefaultConfig {
  url: string
  headers?: RequestInit['headers']
  method?: MethodType
  data?: object | FormData
  timeout?: number
  credentials?: 'include'
}
interface TimeoutError {
  status: 408
  msg: string
  error: Error
}

const host = config.apiDomain

const defaultConfig: Partial<DefaultConfig> = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15e3,
  credentials: 'include'
}

export async function request<T extends ObjectType = ObjectType>(config: DefaultConfig): Promise<AjaxResponse<T>> {
  const { url, method = 'get', data, headers = {}, timeout = defaultConfig.timeout, credentials } = config
  let _url = host + url
  const fetchConfig: RequestInit = {
    method,
    headers: {
      ...defaultConfig.headers,
      ...headers
    },
    credentials: credentials || defaultConfig.credentials
  }
  if (isServer()) {
    // eslint-disable-next-line
    const { cookies } = require('next/headers')

    const cookieStr = (await cookies()).toString()
    if (cookieStr) {
      if (!Array.isArray(fetchConfig.headers)) {
        fetchConfig.headers = fetchConfig.headers || {}
        ;(fetchConfig.headers as Record<string, string>).Cookie = cookieStr
      }
    }
  }

  switch (method) {
    case 'get':
      _url += `?${new URLSearchParams(data as Record<string, string>).toString()}`
      break
    case 'post':
      if (data instanceof FormData) {
        fetchConfig.body = data
        ;(fetchConfig.headers as Record<string, string>)['Content-Type'] = 'multipart/form-data'
      } else {
        fetchConfig.body = JSON.stringify(data)
      }
      break
    default:
  }

  const fetchPromise = fetch(_url, fetchConfig)
  const timeoutPromise = new Promise<never>((_, reject: (err: TimeoutError) => void) =>
    setTimeout(
      () =>
        reject({
          status: 408,
          msg: '请求超时',
          error: new Error('请求超时')
        }),
      timeout
    )
  )

  try {
    const response = await Promise.race([fetchPromise, timeoutPromise])
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态码: ${response.status}`)
    }
    const result = (await response.json()) as AjaxResponse<T>
    return result
  } catch (err: unknown) {
    logger.error(err)
    if ((err as TimeoutError).status === 408) {
      return {
        flag: 0,
        code: ERROR_CLIENT_CODE.TIMEOUT,
        msg: '请求超时'
      }
    } else {
      return {
        flag: 0,
        code: ERROR_CLIENT_CODE.UNKNOWN,
        msg: '请求失败, 请稍后重试'
      }
    }
  }
}
