'use client'
import useGetOrderList from '../../_hooks/useGetOrderList'
import OrderTableList from '../../_ui/OrderTableList'
import useStore from '@/components/StoreNavLayout/store'

export default function OrderPage() {
  const curStore = useStore((state) => state.curStore)
  const { curPage, pageSize, total, list, isLoading, mutate } = useGetOrderList({ storeId: curStore?.id, pageSize: 1 })
  console.log(list)
  const handlePageChange = (curPage: number) => {
    console.log('curPage:::::', curPage)
  }
  return (
    <div>
      <OrderTableList onPageChange={handlePageChange} list={list} curPage={curPage} pageSize={pageSize} total={total} isLoading={isLoading} />
    </div>
  )
}
