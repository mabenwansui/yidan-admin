import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Page } from '@/common/types/page'
import { Order, ORDER_STATUS, ORDER_TYPE } from '@/common/types/order'

export const url = '/api/order/list'

interface Params {
  key?: string
  curPage?: number
  orderId?: string
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
  const { mutate, isLoading, data } = useSWR({ url, arg: params }, fetcher)
  return { mutate, isLoading, data: data?.data }
}
