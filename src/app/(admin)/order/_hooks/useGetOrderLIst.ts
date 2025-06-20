import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Page } from '@/common/types/page'
import { Order, ORDER_STATUS, ORDER_TYPE } from '@/common/types/order'

export const url = '/api/order/list'

interface Params {
  key?: string
  curPage?: number
  pageSize?: number
  storeId?: string
  orderType?: ORDER_TYPE
  orderStatus?: ORDER_STATUS
}
interface FetcherArg {
  url: string
  arg: Params
}

interface Response extends Page {
  list: Order[]
}

const fetcher = async (params: FetcherArg) => {
  return await post<Response>(params.url, params.arg)
}

export default function useGetOrderLIst(params: Params) {
  const { storeId } = params
  const { mutate, isLoading, data } = useSWR(storeId ? { url, arg: params } : null, fetcher)
  return {
    mutate,
    isLoading,
    list: data?.data?.list,
    curPage: data?.data?.curPage || 1,
    pageSize: data?.data?.pageSize || 0,
    total: data?.data?.total || 0
  }
}
