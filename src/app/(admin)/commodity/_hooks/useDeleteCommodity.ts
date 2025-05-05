import { useSWRTrigger } from '@/common/hooks/useAjax'

const url = '/api/commodity/delete'

interface Props {
  id: string
}

export default function useDeleteCommodity() {
  return useSWRTrigger<Props, Record<never, never>>(url)
}
