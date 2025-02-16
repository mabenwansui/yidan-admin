import { Menu, ConfigProvider } from 'antd'
import Link from 'next/link'

const items = [
  {
    key: 'home',
    label: <Link href="/">首页</Link>
  },
  {
    key: 'commodity-manger',
    label: '商品管理',
    children: [
      {
        key: 'commodity-create',
        label: <Link href="/commodity/create">商品创建</Link>
      },
      {
        key: 'commodity-list',
        label: <Link href="/commodity/list">商品列表</Link>
      }
    ]
  }
]

export default function Nav() {
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
      <Menu defaultSelectedKeys={['home']} theme="dark" defaultOpenKeys={['sub1']} mode="inline" items={items} />
    </ConfigProvider>
  )
}
