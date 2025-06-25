'use client'
import { useRouter } from 'next/navigation'
import useStore from '@/components/Layout/StoreNavLayout/store'
import { ORDER_STATUS } from '@/common/types/order'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { useGetArchivedOrderList } from '../../../_hooks/useGetOrderList'
import OrderTableList from '../../../_ui/OrderTableList'

export default function OrderPage() {
  const curStore = useStore((state) => state.curStore)
  const router = useRouter()
  const { curPage, pageSize, total, list, isLoading, refresh } = useGetArchivedOrderList({
    storeId: curStore?.id
  })
  const handlePageChange = (curPage: number) => {
    refresh({ curPage })
  }
  const handleView = (id: string) => {
    router.push(`${ROUTE_PATH.ORDER_DETAILS}/${id}`)
  }

  return (
    <div>
      <OrderTableList
        onView={handleView}
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
