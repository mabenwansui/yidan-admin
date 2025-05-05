import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

const url = '/api/commodity/create'

interface Props extends Omit<Commodity, 'category'> {
  category?: string
}

export default function useCreateCommodity() {
  return useSWRTrigger<Props, { id: string }>(url)
}
