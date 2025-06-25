import useSWRList from '@/common/hooks/useAjax/useSWRList'
import { Page } from '@/common/types/page'
import { Order, ORDER_STATUS, ORDER_TYPE } from '@/common/types/order'

export const url = '/api/order/admin/list'
export const archivedUrl = '/api/order/admin/list-archived'

interface Params {
  curPage?: number
  pageSize?: number
  storeId?: string
  orderType?: ORDER_TYPE
  orderStatus?: ORDER_STATUS
}
interface Response extends Page {
  list: Order[]
}

export function useGetOrderList(params: Params) {
  const { mutate, isLoading, list, curPage, pageSize, total, refresh } = useSWRList<Params, Response>(url, params)
  return {
    mutate,
    isLoading,
    list,
    curPage,
    pageSize,
    total,
    refresh
  }
}

type ArchivedParams = Omit<Params, 'orderStatus'>
export function useGetArchivedOrderList(params: ArchivedParams) {
  const { mutate, isLoading, list, curPage, pageSize, total, refresh } = useSWRList<Params, Response>(
    archivedUrl,
    params
  )
  return {
    mutate,
    isLoading,
    list,
    curPage,
    pageSize,
    total,
    refresh
  }
}

// import { useSWR } from '@/common/hooks/useAjax'
// import { post } from '@/common/utils/ajax'
// import { Page } from '@/common/types/page'
// import { Order, ORDER_STATUS, ORDER_TYPE } from '@/common/types/order'

// export const url = '/api/order/list'

// interface Params {
//   curPage?: number
//   pageSize?: number
//   storeId?: string
//   orderType?: ORDER_TYPE
//   orderStatus?: ORDER_STATUS
// }
// interface FetcherArg {
//   url: string
//   arg: Params
// }

// interface Response extends Page {
//   list: Order[]
// }

// const fetcher = async (params: FetcherArg) => {
//   return await post<Response>(params.url, params.arg)
// }

// export default function useGetOrderList(params: Params) {
//   const { storeId } = params
//   const { mutate, isLoading, data } = useSWR(storeId ? { url, arg: params } : null, fetcher)
//   return {
//     mutate,
//     isLoading,
//     list: data?.data?.list,
//     curPage: data?.data?.curPage || 1,
//     pageSize: data?.data?.pageSize || 0,
//     total: data?.data?.total || 0
//   }
// }
