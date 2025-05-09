'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSWRConfig } from 'swr'
import useGetCommodityInfo, { FORMAT_TYPE } from '../../../_hooks/useGetCommodityInfo'
import useUpdateCommodity from '../../../_hooks/useUpdateCommodity'
import { url } from '../../../_hooks/useGetCommodityList'
import Drawer, { DrawerFormType, CommoditySubmitValues } from '../../../_ui/CommodityForm/Drawer'

export default function EditPage() {
  const router = useRouter()
  const { id } = useParams()
  const [open, setOpen] = useState(true)
  const { mutate } = useSWRConfig()
  const { trigger: update } = useUpdateCommodity()
  const { data, isLoading } = useGetCommodityInfo({ commodityId: id as string, format: FORMAT_TYPE.FORM })
  const handleAfterOpenChange = (open: boolean) => {
    if (open === false) router.back()
  }
  const handleSubmit = async (values: CommoditySubmitValues) => {
    const { category, imgNames, ...rest } = values
    const { flag } = await update({
      category: category?.value,
      imgNames: imgNames?.map((item) => item.name) || [],
      ...rest
    })
    if (flag === 1) {
      mutate((key: any) => key?.url?.startsWith(url))
      router.back()
    }
  }
  return (
    <Drawer
      onSubmit={handleSubmit}
      initialValues={data}
      isLoading={isLoading}
      type={DrawerFormType.EDIT}
      afterOpenChange={handleAfterOpenChange}
      open={open}
      onClose={() => setOpen(false)}
    />
  )
}
