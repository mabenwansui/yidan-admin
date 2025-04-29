import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'
import { Page } from '@/common/types/page'

export interface Search {
  key?: string | null
  storeId: string
  curPage?: number
  pageSize?: number
}
interface Response extends Page {
  list: Branch[]
}
interface ArgsParams {
  url: string
  args: Search
}

export interface FormatStore extends Omit<Branch, 'storeId' | 'commodityId' | 'store' | 'commodity'> {
  commodityName?: string
  commodityId?: string
  commodityCategory?: string
  isOnShelfFormat?: string
}

const dataFormat = (list?: Branch[]): FormatStore[] | undefined => {
  return list?.map((item) => {
    const { commodity, ...rest } = item
    return {
      commodityName: commodity?.name,
      commodityId: commodity?.id,
      commodityCategory: commodity?.category?.title,
      isOnShelfFormat: item.isOnShelf ? '上架中' : '已下架',
      ...rest
    }
  })
}

export const url = '/api/branch/search-commodity'
const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)
export function useGetBranchList(params: Search) {
  const { key = '', ..._params } = params
  const [search, setSearch] = useState<Search>(_params)
  const [index, setIndex] = useState(0)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${key}${index}`,
      args: search
    },
    fetcher,
    { keepPreviousData: true }
  )
  const refresh = (params?: Partial<Search>) => {
    if (params) setSearch({ ...search, ...params })
    setIndex(index + 1)
  }
  const response = {
    index,
    curPage: data?.data?.curPage,
    pageSize: data?.data?.pageSize,
    total: data?.data?.total,
    list: dataFormat(data?.data?.list),
    refresh,
    isLoading
  }
  return response
}
