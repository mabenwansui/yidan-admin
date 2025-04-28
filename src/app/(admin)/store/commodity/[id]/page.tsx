'use client'
import { useParams, useSearchParams } from 'next/navigation'
import CommodityTableList from '../../_ui/CommodityTableList'
import { useGetBranchList } from '../../_hooks/useGetBranchList'

export default function CreateCommodityPage() {
  const params = useParams<{ id: string }>()
  const { id } = params
  const searchParams = useSearchParams()
  const { isLoading, list, curPage, pageSize, total } = useGetBranchList({ storeId: id, key: searchParams.get('t') })
  return (
    <div>
      {list && (
        <CommodityTableList
          isLoading={isLoading}
          list={list}
          curPage={curPage}
          pageSize={pageSize}
          total={total}
          isFirstLoad={false}
        />
      )}
    </div>
  )
}
