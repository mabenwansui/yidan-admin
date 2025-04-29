'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useGetStoreList from '../_hooks/useGetStoreList'
import useDeleteStore from '../_hooks/useDeleteStore'
import StoreTableList from '../_ui/StoreTableList'
import CreateFormDrawer from '../_ui/CreateFormDrawer'
import EditFormDrawer from '../_ui/EditFormDrawer'
import { Store } from '@/common/types/store'

export default function List() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [key, setKey] = useState(1)
  const [initialValues, setInitialValues] = useState<Store>()
  const { isFirstLoad, list, isLoading, curPage, pageSize, refresh, total } = useGetStoreList()
  const { trigger: deleteStore } = useDeleteStore()
  const handleCreateSubmit = () => {
    setCreateOpen(false)
    refresh()
    setKey(key + 1)
  }
  const handleEditSubmit = () => {
    setEditOpen(false)
    refresh()
    setKey(key + 1)
  }
  const handleEdit = (record: Store) => {
    setInitialValues(record)
    setEditOpen(true)
  }
  const handleDel = async (id: string) => {
    await deleteStore({ id })
    refresh()
  }
  return (
    <section>
      <div className="flex justify-end mb-4">
        <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>
          创建店铺
        </Button>
        <CreateFormDrawer
          formKey={key}
          open={createOpen}
          onSubmit={handleCreateSubmit}
          onClose={() => setCreateOpen(false)}
        />
      </div>
      <StoreTableList
        onEdit={handleEdit}
        onDel={handleDel}
        list={list}
        isLoading={isLoading}
        isFirstLoad={isFirstLoad}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
      />

      <EditFormDrawer
        key={key}
        onSubmit={handleEditSubmit}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={initialValues}
      />
    </section>
  )
}
