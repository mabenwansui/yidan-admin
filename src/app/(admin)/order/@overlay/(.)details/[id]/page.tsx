'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Drawer } from 'antd'
import OrderDetails from '../../../_ui/OrderDetails'

export default function OrderDetailsDrawer() {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const handleAfterOpenChange = (open: boolean) => {
    if (open === false) router.back()
  }

  return (
    <Drawer
      title="订单详情"
      width={650}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={handleAfterOpenChange}
    >
      <OrderDetails />
    </Drawer>
  )
}
