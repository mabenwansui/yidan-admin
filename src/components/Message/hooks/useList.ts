import { useState, useEffect } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Message, SenderType } from '@/common/types/message'

export const url = '/api/message/list'
interface Response {
  list: Message[]
}
interface Params {
  curPage?: number
  pageSize?: number
}
interface FetcherArg {
  url: string
  arg: Params
}
export function useSystemList(params: Params, shouldFetch: boolean) {
  const [fetch, setFetch] = useState(shouldFetch)
  const { mutate, isLoading, data } = useSWR(
    fetch ? { url, arg: params } : null,
    async (params: FetcherArg) => await post<Response>(params.url, { ...params.arg, senderType: SenderType.SYSTEM })
  )
  useEffect(() => setFetch(shouldFetch), [shouldFetch])
  return { mutate, isLoading, list: data?.data?.list }
}
