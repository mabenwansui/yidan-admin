import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/store/delete'

interface Params {
  id: string
}

const fetcher = async (arg: Params) => await post<Record<never, never>>(url, arg)
export default function useDelete() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Params }) => await fetcher(arg))
  return { trigger }
}
