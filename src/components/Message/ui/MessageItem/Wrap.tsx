import { Tag, Button, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface WrapProps {
  read: boolean
  title: string
  children: React.ReactNode
  onRead: () => void
  onDelete: () => void
}
export default function Wrap(props: WrapProps) {
  const { title, children, read, onRead, onDelete } = props
  return (
    <div onClick={onRead} className="border border-border rounded-md cursor-pointer mb-4">
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
            <Button onClick={onDelete} type="text" icon={<DeleteOutlined />}></Button>
          </Tooltip>
        </aside>
      </div>
      <div className="pt-3 pb-3">{children}</div>
    </div>
  )
}
