import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

const url = '/api/commodity/update'

interface Props extends Omit<Commodity, 'category'> {
  category?: string
}

export default function useDeleteCommodity() {
  return useSWRTrigger<Props, Record<never, never>>(url)
}
