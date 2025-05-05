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
  const [index, setIndex] = useState(0)

  const [args, setArgs] = useState<Omit<Params, 'key'>>({ ..._params })
  const isFirstLoad = index === 0 ? true : false
  const { data, isLoading } = useSWR(
    {
      url: `${url}${key}${index}`,
      args
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = useCallback((params?: Partial<Params>) => {
    if (params) setArgs({ ...args, ...params })
    setIndex(index + 1)
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    index,
    isFirstLoad,
    refresh,
    isLoading,
    curPage: 1,
    pageSize: 30,
    total: 0,
    ...(data?.data as Response)
  }
}
