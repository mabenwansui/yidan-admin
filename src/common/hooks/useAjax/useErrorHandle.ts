import { ERROR_CODE } from '@/common/constants/errorCode'
import { App } from 'antd'
import { ROUTE_PATH, SEARCH_PARAMS } from '@/common/constants/routePath'
import { useRouter } from 'next/navigation'

let lastMsg = ''
let timer: NodeJS.Timeout
function setLastMsg(msg: string) {
  lastMsg = msg
  clearTimeout(timer)
  timer = setTimeout(() => {
    lastMsg = ''
  }, 2000)
}

export default function useErrorHandle() {
  const { message } = App.useApp()
  const router = useRouter()
  function errorHandle(code: string, msg?: string) {
    if (lastMsg !== msg && msg) {
      setLastMsg(msg)
      setTimeout(() => message.error(msg))
    }
    switch (code) {
      case ERROR_CODE.USER_NOT_FOUND:
      case ERROR_CODE.AUTH_CHECK_ERROR: {
        const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${window.encodeURIComponent(window.location.href.split('?')[0])}`
        router.push(redirectUrl)
        break
      }
    }
  }
  return errorHandle
}
