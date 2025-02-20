import useSWR, { SWRConfiguration, SWRHook } from 'swr'
import { ERROR_CODE } from '@/common/constants/errorCode'
import useSWRMutation from 'swr/mutation'
import logger from '@/common/utils/logger'
import { App } from 'antd'
import { ajax, ObjectType, MethodType } from '@/common/utils/ajax'
import { ROUTE_PATH, SEARCH_PARAMS } from '@/common/constants/routePath'
// nextjs路由重定向
import { useRouter } from 'next/navigation'
import { swrErrorHandleMiddleware } from './swrMiddleware'

interface Fetcher {
  url: string
  params?: object | FormData
}

function useErrorHandle() {
  const { message } = App.useApp()
  const router = useRouter()
  function errorHandle(code: string, msg?: string) {
    if (msg) message.error(msg)
    switch (code) {
      case ERROR_CODE.AUTH_CHECK_FAILED: {
        const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${window.encodeURIComponent(window.location.href.split('?')[0])}`
        router.push(redirectUrl)
        break
      }
    }
  }
  return errorHandle
}

export function useAjax<T extends ObjectType>(
  key: string,
  fetcher: Fetcher,
  options: SWRConfiguration = {},
  method: MethodType = 'post'
) {
  const errorHandle = useErrorHandle()
  const { url, params = {} } = fetcher
  const { data, error, isLoading } = useSWR(key, () => ajax<T>(url, params, { method }), options)
  if (error) logger.error(error)
  if (data?.flag === 0) {
    errorHandle(data.code, data?.msg)
  }
  return {
    data: data?.data,
    isLoading
  }
}

export function usePost<T extends ObjectType>(key: string, fetcher: Fetcher, options: SWRConfiguration = {}) {
  return useAjax<T>(key, fetcher, options, 'post')
}

export function useAjaxMutation<T extends ObjectType>(url: string, method: MethodType = 'post') {
  const errorHandle = useErrorHandle()
  const sendRequest = async (url: string, { arg }: { arg: ObjectType | FormData }) => ajax<T>(url, arg, { method })
  const { trigger, isMutating, data, error } = useSWRMutation(url, sendRequest, {
    onSuccess: async (data) => {
      if (data.flag === 0) {
        errorHandle(data.code, data.msg)
      }
      return data
    }
  })
  return { trigger, isLoading: isMutating, data, error }
}

export function usePostMutation<T extends ObjectType>(url: string) {
  return useAjaxMutation<T>(url)
}

// export function useAjax<T extends ObjectType>(
//   url: string,
//   params: ObjectType | FormData = {},
//   options: SWRConfiguration = {},
//   method: 'get' | 'post' = 'post'
// ) {
//   const { message } = App.useApp()
//   const router = useRouter()
//   const { data, error, isLoading } = useSWR(
//     {
//       url,
//       params
//     },
//     ({ url, params }: Fetcher) => ajax<T>(url, params, { method }),
//     options
//   )
//   if (error) logger.error(error)
//   if (data?.flag === 0) {
//     if (data?.msg) message.error(data.msg)
//     switch (data.code) {
//       case ERROR_CODE.AUTH_REFRESH_CHECK_FAILED: {
//         const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${window.encodeURIComponent(window.location.href.split('?')[0])}`
//         router.push(redirectUrl)
//         break
//       }
//     }
//   }
//   return {
//     data: data?.data,
//     isLoading
//   }
// }
