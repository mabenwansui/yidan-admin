import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { AdminUser } from '@/common/types/user'

export interface Search {
  username?: string
  nickname?: string
  curPage?: number
  pageSize?: number
}

interface Response {
  list: Array<AdminUser>
  pageSize: number
  curPage: number
  total: number
}

interface ArgsParams {
  url: string
  args: Search
}

export const url = '/api/user/search-admin'
const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)

const empty: AdminUser[] = []
export default function useCommoditySearch(params: Search = {}) {
  const { username = '', nickname = '' } = params
  const [index, setIndex] = useState(0)
  const [curPage, setCurPage] = useState(params.curPage || 1)
  const [pageSize] = useState(params.pageSize || 100)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${index}`,
      args: {
        username,
        nickname,
        curPage,
        pageSize
      }
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = (curPage: number) => {
    setCurPage(curPage)
    setIndex(index + 1)
  }

  const response = {
    index,
    curPage,
    pageSize,
    total: data?.data?.total || 0,
    list: data?.data?.list || empty, // empty需要是一个引用类型
    refresh,
    isLoading
  }
  if (index > 0 && isLoading === false && data?.data?.list?.length === 0) {
    refresh(1)
    response.isLoading = false
  }
  return response
}
