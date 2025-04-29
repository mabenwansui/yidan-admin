import { useSWRTrigger } from '@/common/hooks/useAjax'

interface Params {
  id: string
}

export const url = '/api/branch/delete'
export default function useDeleteBranch() {
  return useSWRTrigger<Params, Record<never, never>>(url)
}
