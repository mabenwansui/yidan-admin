import useSWR from '@/common/hooks/useAjax/useSWR'
import { post } from '@/common/utils/ajax'
import { Order } from '@/common/types/order'

export const url = '/api/order/admin/get-info'

interface Params {
  orderId?: string
}

type Response = Order

export default function useGetOrderInfo(params: Params = {}) {
  const { isLoading, data } = useSWR(params.orderId ? url : null, async () => await post<Response>(url, params))
  return {
    data: data?.data,
    isLoading
  }
}
