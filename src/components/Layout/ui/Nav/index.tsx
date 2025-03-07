'use client'
import { useState, useEffect, ReactNode } from 'react'
import { Menu, ConfigProvider, MenuProps } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'

const items = [
  {
    key: ROUTE_PATH.HOME,
    label: <Link href={ROUTE_PATH.HOME}>首页</Link>
  },
  {
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
  }
]

interface SourceItem {
  key: string
  label: ReactNode
  children?: Array<SourceItem>
}
function findKey(items: Array<SourceItem>, path: string, parentKey?: string) {
  for (const item of items) {
    if (path === item.key) {
      return {
        key: item.key,
        parentKey
      }
    }
    if (item.children) {
      return findKey(item.children, path, item.key)
    }
  }
  return false
}

export default function Nav() {
  const [open, setOpen] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const pathname = usePathname()
  useEffect(() => {
    const keys = findKey(items, pathname)
    if (keys) {
      const { key, parentKey } = keys
      if (key) setSelectedKeys([key])
      if (parentKey) setOpen([parentKey])
    }
  }, [pathname, setSelectedKeys, setOpen])
  const handleOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    setOpen(openKeys)
  }
  const handleSelect: MenuProps['onSelect'] = (arg) => {
    const { keyPath } = arg
    const keys = [...keyPath]
    const selectKey = keys.shift()
    setSelectedKeys(selectKey ? [selectKey] : [])
    setOpen(keys)
  }
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        components: {
          Menu: {
            itemSelectedBg: '#ff0000',
            darkItemBg: 'opacity(0)',
            itemBg: 'opacity(0)',
            darkItemSelectedBg: '#0F2468',
            darkSubMenuItemBg: 'opacity(0)',
            itemHeight: 36,
            itemMarginInline: 2
          }
        }
      }}
    >
      <Menu
        defaultSelectedKeys={[ROUTE_PATH.HOME]}
        openKeys={open}
        selectedKeys={selectedKeys}
        theme="dark"
        mode="inline"
        items={items}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
      />
    </ConfigProvider>
  )
}
