'use client'
import { useGetUserInfo } from '@/common/hooks/useGetUserInfo'

export default function Header() {
  const { data } = useGetUserInfo()
  return (
    <div className="bg-white shadow-sm h-11 flex items-center justify-end">
      <div className="pr-4">{data?.data?.username}</div>
    </div>
  )
}
