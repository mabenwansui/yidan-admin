import { post } from '@/common/utils/ajax'
import { Commodity } from '@/common/interface/commodity'

export interface CommoditySearchApiProps {
  search?: string
  curPage?: number
  pageSize?: number
}
export const commoditySearchApiUrl = '/api/commodity/search'
export async function commoditySearchApi(props: CommoditySearchApiProps = {}) {
  return await post<{
    list: Array<Commodity>
    pageSize: number
    curPage: number
    total: number
  }>(commoditySearchApiUrl, props)
}
