import { LoadingOutlined } from '@ant-design/icons'
import cs from 'clsx'

interface Props {
  className?: string
}
export default function Loading(props: Props) {
  return (
    <div className={cs('w-full flex justify-center text-primary', props?.className)}>
      <LoadingOutlined style={{ fontSize: 24 }} />
    </div>
  )
}
