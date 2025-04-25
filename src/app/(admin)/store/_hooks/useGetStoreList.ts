import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

export interface Search {
  curPage?: number
  pageSize?: number
}
interface Response {
  list: Array<Store>
  pageSize: number
  curPage: number
  total: number
}
interface ArgsParams {
  url: string
  args: Search
}

export const url = '/api/store/search'
export function useGetStoreList(params: Search = {}) {
  const [index, setIndex] = useState(0)
  const [curPage, setCurPage] = useState(params.curPage || 1)
  const [pageSize, setPageSize] = useState(params.pageSize || 100)
  const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${index}`,
      args: {
        curPage,
        pageSize
      }
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = (params: Search = {}) => {
    const { curPage, pageSize } = params
    if (pageSize !== undefined) setPageSize(pageSize)
    if (curPage !== undefined) setCurPage(curPage)
    setIndex(index + 1)
  }
  const response = {
    index,
    curPage,
    pageSize,
    total: data?.data?.total || 0,
    list: data?.data?.list,
    refresh,
    isLoading
  }
  // 当访问一个不存在的页面时, 自动跳转到第一页
  if (curPage > 1 && isLoading === false && data?.data?.list?.length === 0) {
    refresh({ curPage: 1 })
    response.isLoading = false
  }
  return response
}
