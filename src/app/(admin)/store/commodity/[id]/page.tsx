'use client'
import { useParams, useSearchParams } from 'next/navigation'
import CommodityTableList from '../../_ui/CommodityTableList'
import useGetBranchList from '../../_hooks/useGetBranchList'
import useDeleteBranch from '../../_hooks/useDeleteBranch'
import { App } from 'antd'

export default function CreateCommodityPage() {
  const params = useParams<{ id: string }>()
  const { id } = params
  const { message } = App.useApp()
  const searchParams = useSearchParams()
  const { trigger: del } = useDeleteBranch()
  const { isLoading, list, curPage, pageSize, total, refresh } = useGetBranchList({
    storeId: id,
    key: searchParams.get('t') || ''
  })
  const handleDel = async (id: string) => {
    const { flag } = await del({ id })
    if (flag) {
      message.success('删除成功')
      refresh()
    }
  }
  return (
    <div>
      {list && (
        <CommodityTableList
          onDel={handleDel}
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
