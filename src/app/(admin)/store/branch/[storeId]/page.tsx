'use client'
import { useState } from 'react'
import { App } from 'antd'
import { Branch, BranchForm } from '@/common/types/branch'
import useStore from '@/components/StoreNavLayout/store'
import useGetBranchList from '../../_hooks/useGetBranchList'
import { useCreateBranch } from '../../_hooks/useUpsertBranch'
import { useUpdateBranch, useDeleteBranch } from '../../_hooks/useUpsertBranch'
import BranchSearch, { Values as SearchValues } from '../../_ui/BranchSearch'
import BranchTableList from '../../_ui/BranchTableList'
import { Drawer, DrawerFormType } from '../../_ui/BranchForm'
import BranchInfo from '../../_ui/BranchInfo'

export default function CreateBranchPage() {
  const curStore = useStore((state) => state.curStore)
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [editInitialValues, setEditInitialValues] = useState<BranchForm>()
  const [createKey, setCreateKey] = useState('create')
  const [drawerKey, setDrawerKey] = useState<string | null>(null)
  const { message } = App.useApp()
  const { isFirstLoad, isLoading, list, curPage, pageSize, total, refresh } = useGetBranchList({
    storeId: curStore?.id
  })
  const { trigger: create } = useCreateBranch()
  const { trigger: del } = useDeleteBranch()
  const { trigger: update } = useUpdateBranch()

  const handleOpenCreate = () => setAddOpen(true)
  const handleOpenEdit = (record: Branch) => {
    const { commodity, ...rest } = record
    const { id, name } = commodity!
    setDrawerKey(record.id)
    setEditInitialValues({
      storeId: curStore!.id,
      commodity: {
        value: id,
        label: name
      },
      ...rest
    })
    setEditOpen(true)
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
      setEditOpen(false)
      setDrawerKey(null)
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
  const handleCreateSubmit = async (values: BranchForm) => {
    const { id: _, ...rest } = values
    const { flag } = await create(rest)
    if (flag === 1) {
      message.success('创建成功')
      setCreateKey(createKey + 1)
      setAddOpen(false)
      refresh()
    }
  }
  return (
    <>
      <div className="mb-6">
        <BranchInfo onAddList={handleOpenCreate} store={curStore} />
        {curStore && (
          <Drawer
            type={DrawerFormType.CREATE}
            formKey={createKey}
            initialValues={{ storeId: curStore?.id }}
            open={addOpen}
            onSubmit={handleCreateSubmit}
            onClose={() => setAddOpen(false)}
          />
        )}
      </div>
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
        initialValues={editInitialValues}
        open={editOpen}
        onSubmit={handleSubmit}
        onClose={() => setEditOpen(false)}
      />
    </>
  )
}
