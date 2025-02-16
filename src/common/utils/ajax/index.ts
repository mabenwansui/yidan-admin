import { request, ObjectType } from './request'
import { ERROR_CODE } from '@/common/constants/errorCode'
import { refreshTokenApi } from '@/common/api'
import { isClient, isLogin } from '@/common/utils/env'
import { message } from '@/components/AntAppRoot'
import { redirect } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { SEARCH_PARAMS } from '@/common/constants/routePath'
import config from '@/config'

export const apiPrefix = config.apiDomain

async function redirectLogin() {
  const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${window.encodeURIComponent(window.location.href.split('?')[0])}`
  if (isClient()) {
    window.location.href = redirectUrl
  } else {
    redirect(redirectUrl)
  }
}

async function requestHandle<T extends ObjectType>(type: 'post' | 'get', url: string, params: object | FormData = {}) {
  const result = await request<T>({ url, method: type, data: params })
  const { flag, code, msg } = result
  if (flag === 0) {
    if (msg && isClient() && code !== ERROR_CODE.AUTH_CHECK_FAILED) {
      message.error(msg)
    }
    switch (code) {
      case ERROR_CODE.AUTH_CHECK_FAILED: {
        if (await isLogin()) {
          const { flag: _flag } = await refreshTokenApi()
          if (_flag === 1) {
            return await request<T>({ url, method: 'post', data: params })
          }
        }
        await redirectLogin()
        break
      }
    }
  }
  return result
}

export async function get<T extends ObjectType>(url: string, params: object | FormData = {}) {
  return await requestHandle<T>('get', url, params)
}

export async function post<T extends ObjectType>(url: string, params: object | FormData = {}) {
  return await requestHandle<T>('post', url, params)
}
