'use client'
import BranchTableList from '../_ui/BranchTableList'

export default function CreateCommodityPage() {
  return (
    <div>
      <BranchTableList list={[]} isLoading={false} curPage={1} pageSize={30} total={100} isFirstLoad={false} />
    </div>
  )
}
