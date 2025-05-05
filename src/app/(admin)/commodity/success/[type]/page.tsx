'use client'
import '@ant-design/v5-patch-for-react-19'
import { Button, Result } from 'antd'
import { useParams } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Link from 'next/link'

export default function CommoditySuccessPage() {
  const { type } = useParams()
  const data: any = {}
  switch (type) {
    case 'create':
      data.title = '创建成功!'
      break
    case 'edit':
      data.title = '编辑成功!'
      break
    default:
      data.title = '操作成功!'
  }
  return (
    <div className="bg-white border border-neutral-100 w-full min-h-100 items-center flex justify-center">
      <Result
        status="success"
        title={data.title}
        extra={[
          <Link href={ROUTE_PATH.COMMODITY_LIST} key="cancel">
            <Button type="primary" key="cancel">
              返回列表查看
            </Button>
          </Link>
        ]}
      />
    </div>
  )
}
