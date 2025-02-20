import { ERROR_CODE } from '@/common/constants/errorCode'
import { App } from 'antd'
import { ROUTE_PATH, SEARCH_PARAMS } from '@/common/constants/routePath'
import { useRouter } from 'next/navigation'

export default function useErrorHandle() {
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
