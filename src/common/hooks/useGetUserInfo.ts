import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { User } from '@/common/types/user'

export const getUserInfoApiUrl = '/api/user/get-userinfo'
const fetcher = async () => await post<User>(getUserInfoApiUrl)
export function useGetUserInfo() {
  return useSWR(getUserInfoApiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
}
