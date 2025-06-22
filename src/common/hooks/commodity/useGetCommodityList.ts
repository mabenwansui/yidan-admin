import { Commodity } from '@/common/types/commodity'
import { useSWRList, useSWRTrigger } from '@/common/hooks/useAjax'
import { Page } from '@/common/types/page'

export interface Search extends Page {
  id?: string
  name?: string
  categoryId?: string
}

export const url = '/api/commodity/search'

export default function useGetCommodityList(params: Search = {}) {
  return useSWRList<Search, Response>(url, params)
}

export function useTriggerGetCommodityList() {
  return useSWRTrigger<
    Search,
    {
      list: Array<Commodity>
    } & Page
  >(url)
}
