import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

export const url = '/api/store/update'
type Props = Store

export default function useUpdateStore() {
  return useSWRTrigger<Props, Record<never, never>>(url)
}
