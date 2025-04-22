'use client'
import '@ant-design/v5-patch-for-react-19'
import { useMemo, useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGetStoreList } from './hooks/useGetStoreList'
import StoreTableList from './ui/StoreTableList'
import CreateFormDrawer from './ui/CreateFormDrawer'

export default function List() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const { index, list, isLoading, curPage, pageSize, refresh, total } = useGetStoreList()
  const isFirstLoad = useMemo(() => (index === 0 ? true : false), [index])
  const handleSubmit = () => {
    setCreateOpen(false)
    refresh()
  }
  const handleDel = () => {
    
  }
  return (
    <section>
      <div className="flex justify-end mb-4">
        <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>
          创建店铺
        </Button>
        <CreateFormDrawer
          open={createOpen}
          onSubmit={handleSubmit}
          onClose={() => setCreateOpen(false)}
          formKey="create"
        />
      </div>
      <StoreTableList
        onDel={handleDel}
        list={list}
        isLoading={isLoading}
        isFirstLoad={isFirstLoad}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
      />
    </section>
  )
}
