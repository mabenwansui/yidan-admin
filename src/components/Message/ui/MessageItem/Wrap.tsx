import { Tag, Button, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import cs from 'clsx'

interface WrapProps {
  read: boolean
  title: string
  children: React.ReactNode
  onRead: () => void
  onDelete: () => void
}
export default function Wrap(props: WrapProps) {
  const { title, children, read, onRead, onDelete } = props
  const handleRead = () => {
    if (!read) onRead()
  }
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete()
  }
  return (
    // 假设调整是将类名分开传入 cs 函数，并且去掉多余逗号
    <div
      onClick={handleRead}
      className={cs('border', 'border-border', 'rounded-md', !read && 'cursor-pointer', 'mb-4')}
    >
      <div className="bg-gray-100 pl-3 pr-1 font-bold relative flex justify-between items-center min-h-9">
        <div>
          {!read && (
            <Tag color="error" className="me-0! mr-2!">
              新
            </Tag>
          )}
          {title}
        </div>
        <aside>
          <Tooltip title="删除">
            <Button onClick={handleDelete} type="text" icon={<DeleteOutlined />}></Button>
          </Tooltip>
        </aside>
      </div>
      <div className="pt-3 pb-3">{children}</div>
    </div>
  )
}
