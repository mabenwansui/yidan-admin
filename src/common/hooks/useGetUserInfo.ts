import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { ROLE } from '@/common/constants/user'
interface GetUserInfoApiResponse {
  id: string
  username: string
  email: string
  role: ROLE
}
export const getUserInfoApiUrl = '/api/user/get-user-info'
export async function getUserInfoApi() {
  return await post<GetUserInfoApiResponse>(getUserInfoApiUrl)
}
export function useGetUserInfo() {
  return useSWR(getUserInfoApiUrl, getUserInfoApi, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
}
