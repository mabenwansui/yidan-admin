import { useSWRTrigger } from '@/common/hooks/useAjax'

export const url = '/api/message/read'

export default function useSetRead() {
  const { trigger } = useSWRTrigger<{ id?: string }, Record<never, never>>(url)
  return { trigger }
}
