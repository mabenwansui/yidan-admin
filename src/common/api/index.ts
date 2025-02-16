import { post } from '@/common/utils/ajax'
import { COOKIE_KEY } from '@/common/constants/cookie'
import { getCookie } from '@/common/utils/cookie'

export const refreshTokenApiUrl = '/api/auth/refresh-auth'
export async function refreshTokenApi() {
  const authKey = await getCookie(COOKIE_KEY.TOKEN)
  return await post<{ status: 'ok' }>(refreshTokenApiUrl, {
    authKey: authKey || ''
  })
}

export const getUserInfoApiUrl = '/api/user/get-user-info'
export async function getUserInfoApi() {
  return await post(getUserInfoApiUrl)
}
