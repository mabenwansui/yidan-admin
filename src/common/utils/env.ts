import { COOKIE_KEY } from '@/common/constants/cookie'
import { getCookieClient, getCookieServer } from '@/common/utils/cookie'

export function isClient() {
  return typeof window !== 'undefined'
}

export function isServer() {
  return typeof window === 'undefined'
}

export async function isLogin() {
  if (isClient()) {
    return !!getCookieClient(COOKIE_KEY.TOKEN)
  } else {
    return !!(await getCookieServer(COOKIE_KEY.TOKEN))
  }
}
