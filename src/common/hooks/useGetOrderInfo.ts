import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Order } from '@/common/types/order'

export const url = '/api/order/admin/get-info'
export default function useGetOrderInfo(orderId?: string) {
  const { mutate, isLoading, data } = useSWR(url, async (url) => await post<Order>(url, { orderId }))
  return { mutate, isLoading, data: data?.data }
}
