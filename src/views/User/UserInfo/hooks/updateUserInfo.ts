import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { User } from '@/common/types/user'

type UserProps = Omit<User, 'role'>

export const url = '/api/user/update'
const fetcher = async (arg: UserProps) => await post<Record<never, never>>(url, arg)

export default function useUpdateUserInfo() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: UserProps }) => await fetcher(arg))
  return { trigger }
}
