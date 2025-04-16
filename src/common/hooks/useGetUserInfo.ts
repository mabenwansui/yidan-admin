import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { ROLE } from '@/common/constants/role'
interface GetUserInfoApiResponse {
  id: string
  username: string
  email: string
  role: ROLE
}
export const getUserInfoApiUrl = '/api/user/get-userinfo'
const fetcher = async () => await post<GetUserInfoApiResponse>(getUserInfoApiUrl)
export function useGetUserInfo() {
  return useSWR(getUserInfoApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
}
