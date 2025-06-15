'use client'
import { Divider, Breadcrumb } from 'antd'
import PersonalInfo from '../PersonalInfo'
import Message from '../../../Message'
import useBreadcrumbConfig from '../../hooks/useBreadcrumbConfig'

export default function Header() {
  const [breadcrumbList] = useBreadcrumbConfig()
  return (
    <div className="bg-white shadow-sm h-11 flex items-center justify-between pr-4">
      <div className="pl-4 text-sm font-medium text-gray-500">
        {/* {routeTitleMapping[pathname]} */}
        <Breadcrumb items={breadcrumbList} />
      </div>
      <div className="flex items-center">
        <Message />
        <Divider type="vertical" />
        <PersonalInfo />
      </div>
    </div>
  )
}
