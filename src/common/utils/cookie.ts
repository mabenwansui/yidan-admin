export function setCookie(name: string, value: string, days = 7, path = '/', domain = '', secure = false) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // 计算过期时间
  let cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}`
  if (domain) cookie += `; domain=${domain}`
  if (secure) cookie += `; secure`
  document.cookie = cookie
}

export function getCookie(name: string) {
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

export function hasCookie(name: string) {
  return getCookie(name) !== null
}

export function removeCookie(name: string, path = '/', domain = '') {
  setCookie(name, '', -1, path, domain)
}

export function getCookieServer(name?: string) {
  // eslint-disable-next-line
  const { cookies } = require('next/headers')
  return cookies().get(name)
}
