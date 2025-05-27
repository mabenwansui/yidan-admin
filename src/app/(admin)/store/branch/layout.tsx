'use client'
import { useMemo, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { App } from 'antd'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { BranchForm } from '@/common/types/branch'
import useGetStoreList from '../_hooks/useGetStoreList'
import { useCreateBranch } from '../_hooks/useUpsertBranch'
import BranchNav from '../_ui/BranchNav'
import BranchInfo from '../_ui/BranchInfo'
import { Drawer, DrawerFormType } from '../_ui/BranchForm'

interface Props {
  children: React.ReactNode
}
export default function BranchLayout(props: Props) {
  const [addOpen, setAddOpen] = useState(false)
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [createKey, setCreateKey] = useState(0)
  const { list, isLoading } = useGetStoreList()
  const { trigger: createBranch } = useCreateBranch()
  const storeId = params?.id
  const curStore = useMemo(() => list?.find((item) => item.id === params.id), [list, params.id])
  const { message } = App.useApp()
  const handleNavClick = (id: string) => router.push(`${ROUTE_PATH.STORE_COMMODITY}/${id}`)
  const handleOpenCreate = () => setAddOpen(true)
  const handleCreateSubmit = async (values: BranchForm) => {
    const { id: _, ...rest } = values
    const { flag } = await createBranch(rest)
    if (flag === 1) {
      message.success('创建成功')
      setCreateKey(createKey + 1)
      setAddOpen(false)
      router.push(`${ROUTE_PATH.STORE_COMMODITY}/${params.id}?t=${Date.now()}`)
    }
  }
  return (
    <div className="flex justify-between">
      <div className="w-34 min-w-34">{<BranchNav list={list} onClick={handleNavClick} selectId={storeId} />}</div>
      <div className="flex-auto ml-6">
        <section className="w-full mb-6">
          <BranchInfo onAddList={handleOpenCreate} store={curStore} isLoading={isLoading} />
          <Drawer
            type={DrawerFormType.CREATE}
            formKey={createKey}
            initialValues={{ storeId }}
            open={addOpen}
            onSubmit={handleCreateSubmit}
            onClose={() => setAddOpen(false)}
          />
        </section>
        <section>{props.children}</section>
      </div>
    </div>
  )
}
