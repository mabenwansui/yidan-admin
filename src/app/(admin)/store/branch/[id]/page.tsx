'use client'
import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { App } from 'antd'
import { Branch, BranchForm } from '@/common/types/branch'
import useGetBranchList from '../../_hooks/useGetBranchList'
import { useUpdateBranch, useDeleteBranch } from '../../_hooks/useUpsertBranch'
import BranchSearch, { Values as SearchValues } from '../../_ui/BranchSearch'
import BranchTableList from '../../_ui/BranchTableList'
import { Drawer, DrawerFormType } from '../../_ui/BranchForm'

export default function CreateBranchPage() {
  const params = useParams<{ id: string }>()
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<BranchForm>()
  const [drawerKey, setDrawerKey] = useState(0)
  const { message } = App.useApp()
  const searchParams = useSearchParams()
  const { trigger: del } = useDeleteBranch()
  const { trigger: update } = useUpdateBranch()
  const { isFirstLoad, isLoading, list, curPage, pageSize, total, refresh } = useGetBranchList({
    storeId: params.id,
    key: searchParams.get('t') || ''
  })
  const handleOpenEdit = (record: Branch) => {
    const { commodity, ...rest } = record
    setDrawerKey(drawerKey + 1)
    setInitialValues({
      storeId: params.id,
      commodityId: commodity?.id,
      ...rest
    })
    setOpen(true)
  }
  const handleFilterChange = (values: SearchValues) => {
    refresh({
      isOnShelf: values?.isOnShelf === 'all' ? undefined : values.isOnShelf,
      categoryId: values?.category?.value
    })
  }
  const handleSubmit = async (values: BranchForm) => {
    const { flag } = await update(values)
    if (flag === 1) {
      message.success('更新成功')
      setOpen(false)
      setDrawerKey(drawerKey + 1)
      refresh()
    }
  }
  const handleDel = async (id: string) => {
    const { flag } = await del({ id })
    if (flag) {
      message.success('删除成功')
      refresh()
    }
  }
  const handlePageChange = (curPage: number) => refresh({ curPage })
  return (
    <div>
      <BranchSearch onValuesChange={handleFilterChange} />
      <BranchTableList
        isFirstLoad={isFirstLoad}
        isLoading={isLoading}
        list={list}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
        onEdit={handleOpenEdit}
        onDel={handleDel}
      />
      <Drawer
        type={DrawerFormType.EDIT}
        formKey={drawerKey}
        initialValues={initialValues}
        open={open}
        onSubmit={handleSubmit}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
