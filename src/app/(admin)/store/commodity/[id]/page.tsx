'use client'
import CommodityTableList from '../../_ui/CommodityTableList'

export default function CreateCommodityPage() {
  return (
    <div>
      <CommodityTableList list={[]} isLoading={false} curPage={1} pageSize={30} total={100} isFirstLoad={false} />
    </div>
  )
}
