import { useSortable } from '@dnd-kit/sortable'
import { Tag } from 'antd'

export interface ITagItem {
  id: string
  name: string
}

interface Props {
  tag: ITagItem
  onDelete?: (id: string) => void
}

export default function TagItem(props: Props) {
  const { tag, onDelete } = props
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({ id: tag.id })
  const handleClose = (id: string) => onDelete?.(id)
  const style = transform
    ? {
        transform: `translate3d(${transform!.x}px, ${transform!.y}px, 0)`,
        transition: isDragging ? 'unset' : transition,
        zIndex: isDragging ? 10 : 0
      }
    : { transition: 'unset' }
  return (
    <Tag ref={setNodeRef} style={style} closable={true} onClose={() => handleClose(tag.id)}>
      <span className="cursor-move" {...attributes} {...listeners}>
        {tag.name}
      </span>
    </Tag>
  )
}
