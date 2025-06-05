import { useSWRList } from '@/common/hooks/useAjax'

export const url = '/api/tag/remark/admin/list'
interface Item {
  id: string
  name: string
  isSystem: boolean
}
interface Response {
  list: Item[]
}
export default function useRemarkTagList() {
  return useSWRList<Record<never, never>, Response>(url, {})
}
