import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

export interface Search {
  curPage?: number
  pageSize?: number
}
interface Response {
  list: Store[]
  pageSize: number
  curPage: number
  total: number
}
interface ArgsParams {
  url: string
  args: Search
}

export interface FormatStore extends Store {
  ownerFormat: string
  cityFormat: string
  openFormat: string
}

const dataFormat = (list?: Store[]): FormatStore[] | undefined => {
  return list?.map((item) => {
    const { city, open, owner, ...rest } = item
    return {
      city,
      cityFormat: city?.map((item) => item.label).join(', ') || '',
      open,
      openFormat: open ? '营业中' : '已停业',
      owner,
      ownerFormat: owner?.map((item) => item.nickname).join(', ') || '',
      ...rest
    }
  })
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
    list: dataFormat(data?.data?.list),
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
