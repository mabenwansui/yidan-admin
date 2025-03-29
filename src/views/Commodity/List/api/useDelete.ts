import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/commodity/delete'

const fetcher = async (id: string) => await post<Record<never, never>>(url, { id })

export default function useDelete() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: string }) => await fetcher(arg))
  return { trigger }
}
