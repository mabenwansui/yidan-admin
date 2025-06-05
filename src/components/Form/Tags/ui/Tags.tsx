import { Tag } from 'antd'
import AddBtn from './AddBtn'

interface Props {
  list?: { id: string; name: string }[]
  onCreate?: (val: string) => void
  onDelete?: (id: string) => void
  onSort?: (dargId: string, targetId: string) => void
}

export default function Tags(props: Props) {
  const { list = [], onCreate, onDelete } = props
  const handleClose = (id: string) => {
    onDelete?.(id)
  }
  return (
    <>
      {list?.map((item) => (
        <Tag key={item.id} closable={true} onClose={() => handleClose(item.id)}>
          {item.name}
        </Tag>
      ))}
      <AddBtn onFinish={onCreate} />
    </>
  )
}
