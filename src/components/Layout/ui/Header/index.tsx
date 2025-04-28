'use client'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ROLE } from '@/common/constants/role'
import useGetUserInfo from '@/common/hooks/useGetUserInfo'
import { routeTitleMapping } from '@/common/constants/routePath'
import { Popover } from 'antd'
import { ROUTE_PATH } from '@/common/constants/routePath'
import superAvatar from './images/super-admin-avatar.svg'
import adminAvatar from './images/admin-avatar.svg'

export default function Header() {
  const { data } = useGetUserInfo()
  const pathname = usePathname()
  const [avatar] = useMemo(() => {
    const role = data?.data?.role
    if (role?.includes(ROLE.SUPER_ADMIN)) return [superAvatar, '超级管理员']
    if (role?.includes(ROLE.ADMIN)) return [adminAvatar, '管理员']
    return [null, null]
  }, [data?.data?.role])
  function renderSetting() {
    return (
      <div className="-m-2 *:hover:bg-gray-100 *:p-1 *:pl-3 *:pr-3 *:rounded-sm [&_a]:text-gray-600!">
        <div>
          <Link href={ROUTE_PATH.USER_INFO}>个人信息</Link>
        </div>
        <div>
          <Link href={ROUTE_PATH.LOGIN_OUT}>退出登录</Link>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white shadow-sm h-11 flex items-center justify-between pr-4">
      <div className="pl-4 text-sm font-medium text-gray-500">{routeTitleMapping[pathname]}</div>
      <Popover className="flex maben" placement="bottomRight" content={renderSetting()} arrow={false}>
        <div className="cursor-pointer hover:bg-gray-100 p-2 pt-1 pb-1 rounded-md">
          {avatar && (
            <Image className="mr-1" src={avatar} alt="logo" width={16} height={16} style={{ width: 24, height: 24 }} />
          )}
          {data?.data?.username}
        </div>
      </Popover>
    </div>
  )
}
