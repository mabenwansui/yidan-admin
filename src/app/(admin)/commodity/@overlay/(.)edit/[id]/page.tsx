'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useGetCommodityInfo, { FORMAT_TYPE } from '../../../_hooks/useGetCommodityInfo'
import Drawer, { DrawerFormType } from '../../../_ui/CommodityForm/Drawer'

export default function EditPage() {
  const router = useRouter()
  const { id } = useParams()
  const [open, setOpen] = useState(true)
  const { data, isLoading } = useGetCommodityInfo({ commodityId: id as string, format: FORMAT_TYPE.FORM })
  const handleAfterOpenChange = (open: boolean) => {
    if (open === false) router.back()
  }
  return (
    <Drawer
      initialValues={data}
      isLoading={isLoading}
      type={DrawerFormType.EDIT}
      afterOpenChange={handleAfterOpenChange}
      open={open}
      onClose={() => setOpen(false)}
    />
  )
}
