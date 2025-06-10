import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'

export const url = '/api/tag/remark/admin/list'
interface Item {
  id: string
  name: string
  sort: number
  isSystem: boolean
}
interface Response {
  list: Item[]
}
export default function useRemarkTagList() {
  const { mutate, isLoading, data } = useSWR(url, async (url) => await post<Response>(url, {}))
  return { mutate, isLoading, data }
}
