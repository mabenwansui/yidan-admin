import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'

export const url = '/api/branch/update'

type Props = Branch

export default function useUpdateStore() {
  return useSWRTrigger<Props, Record<never, never>>(url)
}
