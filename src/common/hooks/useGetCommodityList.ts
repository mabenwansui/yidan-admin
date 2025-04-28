import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

export interface Search {
  id?: string
  name?: string
  categoryId?: string
  curPage?: number
  pageSize?: number
}

interface Response {
  list: Array<Commodity>
  pageSize: number
  curPage: number
  total: number
}

interface ArgsParams {
  url: string
  args: Search
}

export const url = '/api/commodity/search'
const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)

export default function useCommoditySearch(params: Search = {}) {
  const [search, setSearch] = useState<Search>({ ...params })
  const [index, setIndex] = useState(0)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${index}`,
      args: search
    },
    fetcher
  )

  const refresh = (params?: Search) => {
    if (params) setSearch({ ...search, ...params })
    setIndex(index + 1)
  }

  return {
    index,
    curPage: data?.data?.curPage,
    pageSize: data?.data?.pageSize,
    total: data?.data?.total,
    list: data?.data?.list,
    refresh,
    isLoading
  }
}
