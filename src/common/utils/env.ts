import { COOKIE_KEY } from '@/common/constants/cookie'
import { getCookie, getCookieServer } from '@/common/utils/cookie'

export function isClient() {
  return typeof window!== 'undefined'
}

export function isServer() {
  return typeof window === 'undefined'
}

export function isLogin() {
  if (isClient()) {
    return !!getCookie(COOKIE_KEY.REFRESH_TOKEN)
  } else {
    return !!getCookieServer(COOKIE_KEY.REFRESH_TOKEN)
  }
}