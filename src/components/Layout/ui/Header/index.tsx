'use client'
import { usePathname } from 'next/navigation'
import { Divider } from 'antd'
import { routeTitleMapping } from '@/common/constants/routePath'
import PersonalInfo from './ui/PersonalInfo'
import Message from './ui/Message'

export default function Header() {
  const pathname = usePathname()
  return (
    <div className="bg-white shadow-sm h-11 flex items-center justify-between pr-4">
      <div className="pl-4 text-sm font-medium text-gray-500">
        {routeTitleMapping[pathname]}
        {/* <Breadcrumb
          items={[
            {
              title: '首页'
            },
            {
              title: <a href="">商品管理</a>
            },
            {
              title: '编辑'
            }
          ]}
        /> */}
      </div>
      <div className="flex items-center">
        <Message />
        <Divider type="vertical" />
        <PersonalInfo />
      </div>
    </div>
  )
}
