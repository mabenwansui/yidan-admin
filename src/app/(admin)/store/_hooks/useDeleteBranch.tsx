import { useSWRTrigger } from '@/common/hooks/useAjax'

export const url = '/api/branch/delete'

interface Params {
  id: string
}
export default function useDeleteBranch() {
  return useSWRTrigger<Params, Record<never, never>>(url)
}
