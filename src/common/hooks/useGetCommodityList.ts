import { Commodity } from '@/common/types/commodity'
import { useSWRList, useSWRTrigger } from '@/common/hooks/useAjax'

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

export const url = '/api/commodity/search'

export default function useGetCommodityList(params: Search = {}) {
  return useSWRList<Search, Response>(url, params)
}

export function useTriggerGetCommodityList() {
  return useSWRTrigger<Search, Response>(url)
}
