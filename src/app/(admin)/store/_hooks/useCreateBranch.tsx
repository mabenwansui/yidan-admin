import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'

export const url = '/api/branch/create'

type Params = Branch

export default function useCreateBranch() {
  return useSWRTrigger<Params, { id: string }>(url)
}
