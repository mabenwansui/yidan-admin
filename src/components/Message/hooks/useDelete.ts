import { useSWRTrigger } from '@/common/hooks/useAjax'
import { MessageType } from '@/common/types/message'

interface Params {
  id?: string
  messageType?: MessageType
}
export const url = '/api/message/delete'

export default function useDelete() {
  const { trigger } = useSWRTrigger<Params, Record<never, never>>(url)
  return { trigger }
}
