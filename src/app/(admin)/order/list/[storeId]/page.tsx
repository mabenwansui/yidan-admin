'use client'
import useStore from '@/components/StoreNavLayout/store'
import { useRouter } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import useGetOrderList from '../../_hooks/useGetOrderList'
import { useAccepted } from '../../_hooks/useUpsertOrder'
import OrderTableList from '../../_ui/OrderTableList'
import OrderSearch from '../../_ui/OrderSearch'

export default function OrderPage() {
  const curStore = useStore((state) => state.curStore)
  const router = useRouter()
  const { curPage, pageSize, total, list, isLoading, refresh } = useGetOrderList({ storeId: curStore?.id })
  const { trigger: acceptedTrigger } = useAccepted()
  const handlePageChange = (curPage: number) => {
    refresh({ curPage })
  }
  const handleView = (id: string) => {
    router.push(`${ROUTE_PATH.ORDER_DETAILS}/${id}`)
  }
  const handleAcceptOrder = (id: string) => {
    acceptedTrigger({ orderId: id })
  }
  return (
    <div>
      <OrderSearch />
      <OrderTableList
        onView={handleView}
        onAcceptOrder={handleAcceptOrder}
        onPageChange={handlePageChange}
        list={list}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
        isLoading={isLoading}
      />
    </div>
  )
}
