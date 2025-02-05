import { message } from 'antd'
import logger from '@/common/utils/logger'
import { isClient, isServer } from '@/common/utils/env'
import { isLogin } from '@/common/utils/env'
import { ErrorCode } from '@/common/constants/errorCode'

type ObjectType = Record<string, unknown>
interface AjaxResponse<T extends ObjectType> {
  flag: 0 | 1
  data?: T
  msg?: string
  code?: string
}
interface DefaultConfig {
  url: string
  headers?: RequestInit['headers']
  method?: 'get' | 'post'
  data?: Record<string, string>
  timeout?: number
  credentials?: 'include'
}
interface TimeoutError {
  status: 408
  msg: string
  error: Error
}

const host = 'https://127.0.0.1:4000'

const defaultConfig: Partial<DefaultConfig> = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15e3,
  credentials: 'include',
}

async function request<T extends ObjectType>(config: DefaultConfig): Promise<AjaxResponse<T>> {
  const { url, method = 'get', data, headers = {}, timeout = defaultConfig.timeout, credentials } = config
  let _url = host + url
  const fetchConfig: RequestInit = {
    method,
    headers: {
      ...defaultConfig.headers,
      ...headers,
    },
    credentials: credentials || defaultConfig.credentials,
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
      _url += `?${new URLSearchParams(data).toString()}`
      break
    case 'post':
      fetchConfig.body = JSON.stringify(data)
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
          error: new Error('请求超时'),
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
    const { flag, msg } = result
    if (flag === 0 && msg && isClient()) {
      message.error(msg)
    }
    return result
  } catch (err: unknown) {
    logger.error(err)
    if ((err as TimeoutError).status === 408) {
      return {
        flag: 0,
        code: '9999',
        msg: '请求超时',
      }
    } else {
      return {
        flag: 0,
        code: '9999',
        msg: '请求失败, 请稍后重试',
      }
    }
  }
}

function flagErrorHandlder(url: string, fetchConfig: RequestInit, errorCode: string) {
  switch(errorCode) {
    case ErrorCode.AUTH_CHECK_FAILED: {
      if (isLogin()) {

      }
    }

  }
}

export async function get<T extends ObjectType>(url: string, params: Record<string, string> = {}) {
  return await request<T>({ url, method: 'get', data: params })
}
export async function post<T extends ObjectType>(url: string, params: Record<string, string> = {}) {
  return await request<T>({ url, method: 'post', data: params })
}
