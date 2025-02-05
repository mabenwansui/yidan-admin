import { request, ObjectType } from './request'
import { ErrorCode } from '@/common/constants/errorCode'
import { message } from 'antd'
import { refreshTokenApi } from '@/common/api/auth'
import { isClient, isLogin } from '@/common/utils/env'

async function requestHandle<T extends ObjectType>(type: 'post'|'get', url: string, params: Record<string, string> = {}) {
  const result = await request<T>({ url, method: type, data: params })
  const { flag, code, msg } = result
  if (flag === 0) {
    if (msg && isClient()) {
      message.error(msg)
    }    
    switch(code) {
      case ErrorCode.AUTH_CHECK_FAILED: {
        if (isLogin()) {
          const { flag: _flag } = await refreshTokenApi()
          if (_flag === 1) {
            return await request<T>({ url, method: 'post', data: params })
          }
        }
        break
      }
    }
  }
  return result
}

/**
 * 异步获取数据函数
 * 
 * 该函数通过指定的URL和参数，使用GET请求方式异步获取数据
 * 它允许用户从远程服务器获取信息，并以Promise形式返回获取的数据
 * 
 * @param url - 请求的URL地址，用于指定获取数据的接口位置
 * @param params - 请求的参数，以键值对形式提供，用于指定获取数据的具体条件
 * @returns 返回一个Promise，解析为请求的数据结果
 */
export async function get<T extends ObjectType>(url: string, params: Record<string, string> = {}) {
  return await requestHandle<T>('get', url, params)
}
export async function post<T extends ObjectType>(url: string, params: Record<string, string> = {}) {
  return await requestHandle<T>('post', url, params)
}
