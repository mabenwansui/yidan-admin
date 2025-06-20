'use client'
import { useRouter } from 'next/navigation'
import StoreNavLayout from '@/components/StoreNavLayout'
import { ROUTE_PATH } from '@/common/constants/routePath'

interface Props {
  children: React.ReactNode
}

export default function OrderPage(props: Props) {
  const router = useRouter()
  const handleChange = (orderId: string) => {
    router.push(`${ROUTE_PATH.ORDER_LIST}/${orderId}`)
  }
  return <StoreNavLayout onChange={handleChange}>{props.children}</StoreNavLayout>
}
