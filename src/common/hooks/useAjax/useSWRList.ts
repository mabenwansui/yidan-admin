import { useState, useCallback } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Page } from '@/common/types/page'

interface ParamsObject extends Page {
  [key: string]: any
}

interface ResponseObject {
  curPage?: number
  pageSize?: number
  total?: number
  [key: string]: any
}

/* 用于列表请求的通用ajax封装 */
export default function useSWRList<Params extends ParamsObject, Response extends ResponseObject>(
  url: string | null,
  params: Params
) {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [args, setArgs] = useState<Params>({ ...params })
  const { mutate, data, isLoading } = useSWR(
    url ? [url, args] : null,
    async ([url, args]) => await post<Response>(url!, args),
    {
      keepPreviousData: true
    }
  )
  const refresh = useCallback(
    (params?: Partial<Params>) => {
      setIsFirstLoad(false)
      if (params) {
        setArgs({ ...args, ...params })
      } else {
        mutate()
      }
    },
    [args, mutate]
  )
  return {
    isFirstLoad,
    mutate,
    refresh,
    isLoading,
    curPage: 1,
    pageSize: 30,
    total: 0,
    ...(data?.data as Response)
  }
}
