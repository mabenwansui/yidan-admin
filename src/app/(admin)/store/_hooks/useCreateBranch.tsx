import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'

type Params = Branch

export const url = '/api/branch/create'
export default function useCreateBranch() {
  return useSWRTrigger<Params, { id: string }>(url)
}
