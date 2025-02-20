import { Button, Result } from 'antd'
import OperateBtn from './ui/OperateBtn'
import Link from 'next/link'

export default function CommoditySuccessPage() {
  return (
    <div className="bg-white border border-neutral-100 w-3xl m-auto mt-10">
      <Result
        status="success"
        title="创建成功!"
        extra={[
          <OperateBtn key="primary" />,
          <Link href="/commodity/list" key="cancel">
            <Button key="cancel">返回列表查看</Button>
          </Link>
        ]}
      />
    </div>
  )
}
