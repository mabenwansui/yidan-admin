import { redirect } from 'next/navigation'
import config from '@/config'
import { ERROR_CODE } from '@/common/constants/errorCode'
import { isServer } from '@/common/utils/env'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { SEARCH_PARAMS } from '@/common/constants/routePath'
import { COOKIE_KEY } from '@/common/constants/cookie'
import { getCookie } from '@/common/utils/cookie'
import { request, ObjectType, MethodType } from './request'
export type { AjaxResponse, ObjectType, MethodType } from './request'

export const apiPrefix = config.apiDomain

interface AjaxOptions {
  method: MethodType
}
export async function ajax<T extends ObjectType>(url: string, params: object | FormData, options?: AjaxOptions) {
  const method = options?.method || 'post'
  const result = await request<T>({ url, method, data: params })
  if (result.flag === 0) {
    switch (result.code) {
      case ERROR_CODE.AUTH_CHECK_ERROR: {
        const authKey = await getCookie(COOKIE_KEY.TOKEN)
        if (authKey) {
          const refreshResult = await request<{ status: 'ok' }>({
            url: '/api/auth/refresh-auth',
            method: 'post',
            data: {
              authKey: authKey
            }
          })
          if (refreshResult.flag === 1) {
            return await ajax<T>(url, params, options)
          }
        }
        const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${window.encodeURIComponent(window.location.href.split('?')[0])}`
        if (isServer()) {
          redirect(redirectUrl)
        } else {
          location.href = redirectUrl
        }
        break
      }
    }
  }
  return result
}
export async function post<T extends ObjectType>(url: string, params: object | FormData = {}) {
  return await ajax<T>(url, params, { method: 'post' })
}

// async function requestHandle<T extends ObjectType>(type: 'post' | 'get', url: string, params: object | FormData = {}) {
//   const result = await request<T>({ url, method: type, data: params })
//   const { flag, code, msg } = result
//   if (flag === 0) {
//     if (msg && isClient() && code !== ERROR_CODE.AUTH_CHECK_ERROR) {
//       message.error(msg)
//     }
//     switch (code) {
//       case ERROR_CODE.AUTH_CHECK_ERROR: {
//         if (await isLogin()) {
//           const { flag: _flag } = await refreshTokenApi()
//           if (_flag === 1) {
//             const authKey = await getCookie(COOKIE_KEY.TOKEN)
//             return await request<T>({ url, method: 'post', data: params })
//           }
//         }
//         await redirectLogin()
//         break
//       }
//     }
//   }
//   return result
// }

// export async function get<T extends ObjectType>(url: string, params: object | FormData = {}) {
//   return await requestHandle<T>('get', url, params)
// }

// export async function post<T extends ObjectType>(url: string, params: object | FormData = {}) {
//   return await requestHandle<T>('post', url, params)
// }
