import { Tag, Button, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface WrapProps {
  id: string
  read: boolean
  title: string
  children: React.ReactNode
  onRead: (id: string) => void
}
export default function Wrap(props: WrapProps) {
  const { title, children, id, read, onRead } = props
  const handleClick = () => onRead(id)
  return (
    <div onClick={handleClick} className="border border-border rounded-md cursor-pointer mb-4">
      <div className="bg-gray-100 pl-3 pr-1 font-bold relative flex justify-between items-center min-h-9">
        {title}
        <aside>
          {!read && (
            <Tag color="error" className="me-0!">
              新消息
            </Tag>
          )}
          <Tooltip title="删除">
            <Button type="text" icon={<DeleteOutlined />}></Button>
          </Tooltip>
        </aside>
      </div>
      <div className="pt-3 pb-3">{children}</div>
    </div>
  )
}
