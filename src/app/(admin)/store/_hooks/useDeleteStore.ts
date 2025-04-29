import { useSWRTrigger } from '@/common/hooks/useAjax'

export const url = '/api/store/delete'

interface Params {
  id: string
}
type Response = Record<never, never>

export default function useDeleteStore() {
  return useSWRTrigger<Params, Response>(url)
}
