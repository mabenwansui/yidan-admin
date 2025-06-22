'use client'
import { useState, useEffect } from 'react'
import { Menu, ConfigProvider, MenuProps } from 'antd'
import { SubMenuType } from 'antd/es/menu/interface'
import useConfig from '../../hooks/useNavConfig'

interface FindKey {
  key: string
  parentKey?: string
}

function matchPath(item: SubMenuType, path: string) {
  const match = (item as any)?.match
  const fn = (matchReg: RegExp) => matchReg.test(path)
  if (match) {
    if (Array.isArray(match)) {
      return match.some(fn)
    } else {
      return fn(match)
    }
  }
  return false
}

function findKey(items: MenuProps['items'], path: string, parentKey?: string): FindKey | false {
  if (!items) return false
  for (const item of items) {
    const _item = item as SubMenuType
    if (path === _item?.key || matchPath(_item, path)) {
      return {
        key: _item.key,
        parentKey
      }
    }
    if (_item?.children) {
      const ret: FindKey | false = findKey(_item.children, path, _item.key)
      if (ret) return ret
    }
  }
  return false
}

export default function Nav() {
  const [open, setOpen] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { config, isLoading } = useConfig()
  useEffect(() => {
    const pathname = window.location.pathname
    if (isLoading === true || config?.length === 0) return
    const keys = findKey(config, pathname)
    if (keys) {
      const { key, parentKey } = keys
      if (key) setSelectedKeys([key])
      if (parentKey) setOpen([parentKey])
    }
  }, [setSelectedKeys, setOpen, isLoading, config])
  const handleOpenChange: MenuProps['onOpenChange'] = (openKeys) => setOpen(openKeys)
  const handleSelect: MenuProps['onSelect'] = ({ selectedKeys }) => setSelectedKeys(selectedKeys)

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
            itemPaddingInline: 0
          }
        }
      }}
    >
      <Menu
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
