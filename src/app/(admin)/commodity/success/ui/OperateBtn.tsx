'use client'
import '@ant-design/v5-patch-for-react-19'
import { Button } from 'antd'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OperateBar() {
  const searchParams = useSearchParams()
  return (
    <>
      <Link href={searchParams.get('backurl') || '/'} key="primary">
        <Button type="primary" className="!me-3">
          继续创建
        </Button>
      </Link>
    </>
  )
}
