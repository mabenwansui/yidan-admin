import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

export const url = '/api/store/create'

type Params = Omit<Store, 'id'>
interface Response {
  id: string
}

export default function useCreateStore() {
  return useSWRTrigger<Params, Response>(url)
}
