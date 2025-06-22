import { useSWRTrigger } from '@/common/hooks/useAjax'
import { ORDER_STATUS } from '@/common/types/order'

interface Params {
  orderId?: string
  orderStatus?: ORDER_STATUS
}
export const url = '/api/order/update-stage'

export function useAccepted() {
  const formatArg = (arg: Params) => ({
    orderStatus: ORDER_STATUS.ACCEPTED,
    ...arg
  })
  return useSWRTrigger<Params, Record<never, never>>(url, formatArg)
}

export function useReady() {
  const formatArg = (arg: Params) => ({
    orderStatus: ORDER_STATUS.READY,
    ...arg
  })
  return useSWRTrigger<Params, Record<never, never>>(url, formatArg)
}

export function useCompleted() {
  const formatArg = (arg: Params) => ({
    orderStatus: ORDER_STATUS.COMPLETED,
    ...arg
  })
  return useSWRTrigger<Params, Record<never, never>>(url, formatArg)
}
