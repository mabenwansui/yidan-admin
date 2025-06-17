import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'

export const url = '/api/message/unread-total'
interface Response {
  total: number
}
export default function useUnRead() {
  const { mutate, isLoading, data } = useSWR(url, async (url) => await post<Response>(url, {}))
  return { mutate, isLoading, total: data?.data.total }
}
