import { useState, useCallback } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Page } from '@/common/types/page'

interface ParamsObject extends Page {
  key?: string
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
  url: string,
  params: Params
) {
  const fetcher = async ({ args }: { url: string; args: Params }) => await post<Response>(url, args)
  const { key = '', ..._params } = params
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const [args, setArgs] = useState<Omit<Params, 'key'>>({ ..._params })
  const { mutate, data, isLoading } = useSWR(
    {
      url: `${url}${key}`,
      args
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = useCallback(
    (params?: Partial<Params>) => {
      if (params) setArgs({ ...args, ...params })
      setIsFirstLoad(false)
      mutate()
    },
    [mutate, args]
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
