import { post } from '@/common/utils/ajax'
export async function refreshTokenApi() {
  return await post<{status: 'ok'}>('/api/auth/refresh-auth')
}