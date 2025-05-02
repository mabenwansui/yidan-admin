import { useState, useRef } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'

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
  const paramsRef = useRef<Params | Record<never, never>>({})
  const { key = '', ..._params } = params
  const [args, setArgs] = useState<Omit<Params, 'key'>>(_params)
  const [index, setIndex] = useState(0)
  const isFirstLoad = index === 0 ? true : false
  const { data, isLoading } = useSWR(
    {
      url: `${url}${key}${index}`,
      args
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = (params?: Partial<Params>) => {
    if (params) setArgs({ ...args, ...params })
    setIndex(index + 1)
  }
  // useEffect(() => {
  //   if (lastParams.current !== undefined && lastParams.current !== JSON.stringify(params)) {
  //     refresh(params)
  //   }
  //   lastParams.current = JSON.stringify(params)
  // }, [params])
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
