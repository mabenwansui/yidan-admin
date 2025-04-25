'use client'
import '@ant-design/v5-patch-for-react-19'
import { Button as AntBtn } from 'antd'
import { useRouter } from 'next/navigation'

export default function Button() {
  const router = useRouter()
  const handleClick = () => router.push('/')
  return (
    <AntBtn className="min-w-30" size="large" type="primary" onClick={handleClick}>
      返回首页
    </AntBtn>
  )
}
