import { Result } from 'antd'
import Frame from '@/components/Frame'
import Button from './Button'

export default function NotFound() {
  return (
    <Frame>
      <div className="mt-15">
        <Result status="404" title="404" subTitle="抱歉，您访问的页面不存在" extra={<Button />} />
      </div>
    </Frame>
  )
}
