'use client'
import { useRouter } from 'next/navigation'
import useStore from '@/components/StoreNavLayout/store'
import { ORDER_STATUS } from '@/common/types/order'
import { ROUTE_PATH } from '@/common/constants/routePath'
import useGetOrderList from '../../_hooks/useGetOrderList'
import { useUpdateStage } from '../../_hooks/useUpsertOrder'
import OrderTableList from '../../_ui/OrderTableList'
import OrderSearch, { Values } from '../../_ui/OrderSearch'

export default function OrderPage() {
  const curStore = useStore((state) => state.curStore)
  const router = useRouter()
  const { curPage, pageSize, total, list, isLoading, refresh } = useGetOrderList({ storeId: curStore?.id })
  const { trigger: updateStageTrigger } = useUpdateStage()
  const handlePageChange = (curPage: number) => {
    refresh({ curPage })
  }
  const handleView = (id: string) => {
    router.push(`${ROUTE_PATH.ORDER_DETAILS}/${id}`)
  }
  const handleUpdateStage = async (id: string, orderStatus: ORDER_STATUS) => {
    const { flag } = await updateStageTrigger({ orderId: id, orderStatus })
    if (flag === 1) refresh()
  }
  const handleValuesChange = async (_: any, values: Values) => {
    refresh(values)
  }
  return (
    <div>
      <OrderSearch onValuesChange={handleValuesChange} />
      <OrderTableList
        onView={handleView}
        onUpdateStage={handleUpdateStage}
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
