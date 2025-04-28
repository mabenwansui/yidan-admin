'use client'
import { useMemo, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { useGetStoreList } from '../_hooks/useGetStoreList'
import CommodityNav from '../_ui/CommodityNav'
import CommodityInfo from '../_ui/CommodityInfo'
import AddCommodityDrawer from '../_ui/AddBranchFormDrawer'

interface Props {
  children: React.ReactNode
}
export default function Commodity(props: Props) {
  const [addOpen, setAddOpen] = useState(false)
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { list, isLoading } = useGetStoreList()
  const storeId = params?.id
  const curStore = useMemo(() => list?.find((item) => item.id === params.id), [list, params.id])
  const handleNavClick = (id: string) => router.push(`${ROUTE_PATH.STORE_COMMODITY}/${id}`)
  const handleAddList = () => setAddOpen(true)
  const handleClose = () => setAddOpen(false)
  const handleCreateSubmit = () => {
    router.push(`${ROUTE_PATH.STORE_COMMODITY}/${params.id}?t=${Date.now()}`)
    setAddOpen(false)
  }
  return (
    <div className="flex justify-between">
      <div className="w-34 min-w-34">{<CommodityNav list={list} onClick={handleNavClick} selectId={storeId} />}</div>
      <div className="flex-auto ml-6">
        <section className="w-full mb-6">
          <CommodityInfo onAddList={handleAddList} store={curStore} isLoading={isLoading} />
          <AddCommodityDrawer
            onSubmit={handleCreateSubmit}
            initialValues={{ storeId }}
            open={addOpen}
            onClose={handleClose}
          />
        </section>
        <section>{props.children}</section>
      </div>
    </div>
  )
}
