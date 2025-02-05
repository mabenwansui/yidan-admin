import { post } from '@/common/utils/ajax'

export async function getUserInfoApi(username: string) {
  return await post('/api/user/get-user-info', { username })
}
