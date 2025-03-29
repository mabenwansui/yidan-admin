import { Space, Tooltip, Divider } from 'antd'
import Icons from '@/components/Icons'
interface Props {
  href: string
  onEdit?: () => void
  onRemove?: () => void
}
export default function LinkPreview(props: Props) {
  const { href, onEdit, onRemove } = props
  const handleEdit = () => onEdit?.()
  const handleRemove = () => onRemove?.()
  return (
    <div className="p-2">
      <Space>
        <div className="max-w-40 text-ellipsis">
          <a href={href} className="underline!">
            {href}
          </a>
        </div>
        <Divider type="vertical" />
        <div className="flex">
          <Space>
            <Tooltip title={'编辑'}>
              <Icons name="edit" onClick={handleEdit} className="cursor-pointer" />
            </Tooltip>
            <Tooltip title={'移除链接'}>
              <Icons name="unlink" onClick={handleRemove} className="cursor-pointer" />
            </Tooltip>
          </Space>
        </div>
      </Space>
    </div>
  )
}
