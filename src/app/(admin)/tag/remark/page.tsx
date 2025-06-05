'use client'
import { Alert } from 'antd'
import ReMarkTags from '@/components/Form/Tags/ReMarkTags'

export default function RemarkPage() {
  return (
    <div>
      <section className="mb-6">
        <Alert showIcon message="订单备注标签, 用户下单时快速填写备注内容" type="info" />
      </section>
      <ReMarkTags />
    </div>
  )
}
