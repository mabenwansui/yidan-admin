'use client'
import '@ant-design/v5-patch-for-react-19'
import { useRouter, usePathname } from 'next/navigation'
import StoreNavLayout from '@/components/Layout/StoreNavLayout'
import { ROUTE_PATH } from '@/common/constants/routePath'

interface Props {
  children: React.ReactNode
}

export default function OrderPage(props: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const handleChange = (orderId: string) => {
    if (pathName.includes(ROUTE_PATH.ORDER_LIST)) {
      router.push(`${ROUTE_PATH.ORDER_LIST}/${orderId}`)
    }
    if (pathName.includes(ROUTE_PATH.ORDER_ARCHIVED)) {
      router.push(`${ROUTE_PATH.ORDER_ARCHIVED}/${orderId}`)
    }
  }
  return <StoreNavLayout onChange={handleChange}>{props.children}</StoreNavLayout>
}
