import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { useSearchParams } from 'next/navigation'

interface ParamsObject {
  key?: string
  curPage?: number
  pageSize?: number
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
  const searchParamsObjRef = useRef<Record<string, any> | null>(null)
  const searchParams = useSearchParams()
  const searchParamsObj = useMemo(() => {
    const o: Record<string, any> = {}
    for (const [key, value] of searchParams) o[key] = Number(value)
    return o
  }, [searchParams])
  const [args, setArgs] = useState<Omit<Params, 'key'>>({ ..._params, ...searchParamsObj })
  const isFirstLoad = index === 0 ? true : false
  const { data, isLoading } = useSWR(
    {
      url: `${url}${key}${index}`,
      args
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = useCallback(
    (params?: Partial<Params>) => {
      if (params) setArgs({ ...args, ...params })
      setIndex(index + 1)
    },
    [index, args]
  )
  useEffect(() => {
    if (Object.keys(searchParamsObj).length === 0) return
    if (searchParamsObjRef.current !== null && searchParamsObjRef.current !== searchParamsObj) {
      refresh(searchParamsObj as any)
    }
    searchParamsObjRef.current = searchParamsObj
  }, [searchParamsObj, searchParamsObjRef.current])
  return {
    index,
    isFirstLoad,
    curPage: data?.data?.curPage || 1,
    pageSize: data?.data?.pageSize || 0,
    total: data?.data?.total || 0,
    list: data?.data?.list,
    refresh,
    isLoading
  }
}
