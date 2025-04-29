import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

type Params = Omit<Store, 'id'>
interface Response {
  id: string
}

export const url = '/api/store/create'
export default function useCreateStore() {
  return useSWRTrigger<Params, Response>(url)
}
