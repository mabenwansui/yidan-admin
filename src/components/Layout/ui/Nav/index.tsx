'use client'
import { useState, useEffect } from 'react'
import { Menu, ConfigProvider, MenuProps } from 'antd'
import { SubMenuType } from 'antd/es/menu/interface'
import { usePathname } from 'next/navigation'
import useConfig from './useConfig'

function findKey(items: MenuProps['items'], path: string, parentKey?: string) {
  if (!items) return false
  for (const item of items) {
    const _item = item as SubMenuType
    if (path === _item?.key) {
      return {
        key: _item.key,
        parentKey
      }
    }
    if (_item?.children) {
      return findKey(_item.children, path, _item.key)
    }
  }
  return false
}

export default function Nav() {
  const [open, setOpen] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const pathname = usePathname()
  const { config, isLoading } = useConfig()
  useEffect(() => {
    if (isLoading === true || !config) return
    const keys = findKey(config, pathname)
    if (keys) {
      const { key, parentKey } = keys
      if (key) setSelectedKeys([key])
      if (parentKey) setOpen([parentKey])
    }
  }, [pathname, setSelectedKeys, setOpen, isLoading, config])
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
        defaultSelectedKeys={['home']}
        openKeys={open}
        selectedKeys={selectedKeys}
        theme="dark"
        mode="inline"
        items={config}
        onOpenChange={handleOpenChange}
        onSelect={handleSelect}
      />
    </ConfigProvider>
  )
}
