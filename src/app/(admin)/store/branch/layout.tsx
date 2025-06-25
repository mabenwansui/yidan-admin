'use client'
import { useRouter } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import StoreNavLayout from '@/components/Layout/StoreNavLayout'

interface Props {
  children: React.ReactNode
}
export default function BranchLayout(props: Props) {
  const router = useRouter()
  const handleChange = (storeId: string) => router.push(`${ROUTE_PATH.STORE_COMMODITY}/${storeId}`)
  return (
    <StoreNavLayout onChange={handleChange}>
      <section>{props.children}</section>
    </StoreNavLayout>
  )
}
