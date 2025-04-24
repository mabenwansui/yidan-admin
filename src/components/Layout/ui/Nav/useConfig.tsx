import { useState, useEffect } from 'react'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Link from 'next/link'
import { useGetUserInfo } from '@/common/hooks/useGetUserInfo'
import { ROLE } from '@/common/constants/role'
import { MenuProps } from 'antd'

export default function useConfig() {
  const { data, isLoading } = useGetUserInfo()
  const [config, setConfig] = useState<MenuProps['items']>([])

  useEffect(() => {
    if (isLoading === true) return
    const role = data?.data?.role
    if (!role) return
    const menuConfig = [
      {
        key: ROUTE_PATH.HOME,
        label: <Link href={ROUTE_PATH.HOME}>首页</Link>
      },
      role.includes(ROLE.SUPER_ADMIN) && {
        key: 'project',
        label: '店铺管理',
        children: [
          {
            key: ROUTE_PATH.STORE_LIST,
            label: <Link href={ROUTE_PATH.STORE_LIST}>店铺列表</Link>
          }
        ]
      },
      role.includes(ROLE.SUPER_ADMIN) && {
        key: 'commodity',
        label: '商品管理',
        children: [
          {
            key: ROUTE_PATH.COMMODITY_CREATE,
            label: <Link href={ROUTE_PATH.COMMODITY_CREATE}>商品创建</Link>
          },
          {
            key: ROUTE_PATH.COMMODITY_LIST,
            label: <Link href={ROUTE_PATH.COMMODITY_LIST}>商品列表</Link>
          }
        ]
      },
      (role.includes(ROLE.SUPER_ADMIN) || role.includes(ROLE.ADMIN)) && {
        key: 'user',
        label: '用户管理',
        children: [
          role.includes(ROLE.SUPER_ADMIN) && {
            key: ROUTE_PATH.USER_ADMIN_LIST,
            label: <Link href={ROUTE_PATH.USER_ADMIN_LIST}>全部列表</Link>
          },
          {
            key: ROUTE_PATH.USER_STAFF_LIST,
            label: <Link href={ROUTE_PATH.USER_STAFF_LIST}>职员列表</Link>
          }
        ].filter(Boolean)
      }
    ].filter(Boolean) as MenuProps['items']
    setConfig(menuConfig)
  }, [data?.data, isLoading])
  return { config, isLoading }
}
