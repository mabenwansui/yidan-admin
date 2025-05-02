'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState } from 'react'
import { App } from 'antd'
import { Store } from '@/common/types/store'
import { CreateBtn } from '@/components/Button'
import useGetStoreList from '../_hooks/useGetStoreList'
import useCreateStore from '../_hooks/useCreateStore'
import useUpdateStore from '../_hooks/useUpdateStore'
import useDeleteStore from '../_hooks/useDeleteStore'
import StoreTableList from '../_ui/StoreTableList'
import { Drawer, DrawerFormType } from '../_ui/StoreForm'

export default function List() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [createKey, setCreateKey] = useState(1)
  const [editKey, setEditKey] = useState(1)
  const [initialValues, setInitialValues] = useState<Store>()
  const { isFirstLoad, list, isLoading, curPage, pageSize, refresh, total } = useGetStoreList()
  const { trigger: deleteStore } = useDeleteStore()
  const { trigger: createStore } = useCreateStore()
  const { trigger: updateStore } = useUpdateStore()
  const { message } = App.useApp()
  const handleCreateSubmit = async (values: Store) => {
    const { flag } = await createStore(values)
    if (flag === 1) {
      message.success('创建成功')
      setCreateOpen(false)
      refresh()
      setCreateKey(createKey + 1)
    }
  }
  const handleEditSubmit = async (values: Store) => {
    const { flag } = await updateStore(values)
    if (flag === 1) {
      message.success('更新成功')
      setEditOpen(false)
      refresh()
      setEditKey(editKey + 1)
    }
  }
  const handleOpenEdit = (record: Store) => {
    setInitialValues(record)
    setEditOpen(true)
  }
  const handleDel = async (id: string) => {
    const { flag } = await deleteStore({ id })
    if (flag === 1) {
      refresh()
    }
  }
  return (
    <section>
      <div className="flex justify-end mb-4">
        <CreateBtn onClick={() => setCreateOpen(true)}>创建店铺</CreateBtn>
        <Drawer
          type={DrawerFormType.CREATE}
          formKey={createKey}
          open={createOpen}
          onSubmit={handleCreateSubmit}
          onClose={() => setCreateOpen(false)}
        />
      </div>
      <StoreTableList
        onEdit={handleOpenEdit}
        onDel={handleDel}
        list={list}
        isLoading={isLoading}
        isFirstLoad={isFirstLoad}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
      />
      <Drawer
        type={DrawerFormType.EDIT}
        initialValues={initialValues}
        formKey={editKey}
        open={editOpen}
        onSubmit={handleEditSubmit}
        onClose={() => setEditOpen(false)}
      />
    </section>
  )
}
