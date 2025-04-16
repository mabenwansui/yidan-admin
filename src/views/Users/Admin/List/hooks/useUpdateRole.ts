import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { ROLE } from '@/common/constants/role'

export const url = '/api/user/change-role'

interface Props {
  id: string
  role: (ROLE.ADMIN | ROLE.STAFF)[]
}

const fetcher = async (arg: Props) => await post<Record<never, never>>(url, arg)
export default function useUpdateRole() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
