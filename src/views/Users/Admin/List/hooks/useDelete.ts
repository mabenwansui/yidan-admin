import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/user/delete'

interface Props {
  id: string
}

const fetcher = async (arg: Props) => await post<Record<never, never>>(url, arg)
export default function useDelete() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
