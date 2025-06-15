import { useState, useEffect } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Message, SenderType } from '@/common/types/message'

export const url = '/api/message/list'
interface Response {
  list: Message[]
}
export function useSystemList(shouldFetch: boolean) {
  const [fetch, setFetch] = useState(shouldFetch)
  useEffect(() => setFetch(shouldFetch), [shouldFetch])
  const { mutate, isLoading, data } = useSWR(
    fetch ? url : null,
    async (url) => await post<Response>(url, { senderType: SenderType.SYSTEM })
  )
  return { mutate, isLoading, list: data?.data?.list }
}
