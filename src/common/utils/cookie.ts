import { isClient } from './env'

export function setCookieClient(name: string, value: string, days = 7, path = '/', domain = '', secure = false) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // 计算过期时间
  let cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}`
  if (domain) cookie += `; domain=${domain}`
  if (secure) cookie += `; secure`
  document.cookie = cookie
}

export function getCookieClient(name: string) {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length)) // 解码并返回值
    }
  }
  return null // 如果没有找到对应的 Cookie
}

export function removeCookieClient(name: string, path = '/', domain = '') {
  setCookieClient(name, '', -1, path, domain)
}

export async function getCookieServer(name?: string) {
  // eslint-disable-next-line
  const { cookies } = require('next/headers')
  return (await cookies()).get(name)
}

export async function getCookie(name: string) {
  if (isClient()) {
    return getCookieClient(name)
  } else {
    return await getCookieServer(name)
  }
}
