import { Middleware, SWRHook } from 'swr'
import { AjaxResponse } from '@/common/utils/ajax'
import useErrorHandle from './useErrorHandle'

const swrErrorHandleMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
  const errorHandle = useErrorHandle()
  const swr = useSWRNext(key, fetcher, config)
  if (swr?.data) {
    const { flag, msg, code } = swr.data as unknown as AjaxResponse
    if (flag === 0) {
      errorHandle(code, msg)
    }
  }
  return swr
}
export { swrErrorHandleMiddleware }
