import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

export interface Search {
  search?: string
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

const empty: Commodity[] = []
export default function useCommoditySearch(params: Search = {}) {
  const [index, setIndex] = useState(0)
  const { search = '', curPage = 1, pageSize } = params
  const { data, isLoading } = useSWR(
    {
      url: `${url}${index}`,
      args: {
        search,
        curPage,
        pageSize
      }
    },
    fetcher
  )
  const refresh = () => setIndex(index + 1)
  return {
    // empty需要是一个引用类型
    list: data?.data?.list || empty,
    refresh,
    isLoading
  }
}
