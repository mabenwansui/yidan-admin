'use client'
import useGetUserInfo from '@/common/hooks/useGetUserInfo'

export default function Header() {
  const { data } = useGetUserInfo()
  return (
    <div className="bg-white shadow-sm h-11 flex items-center justify-end">
      <div className="pr-3">{data?.username}</div>
    </div>
  )
}
