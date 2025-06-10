import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable'

import AddBtn from './AddBtn'
import TagItem, { ITagItem } from './TagItem'

interface Props {
  list?: ITagItem[]
  onCreate?: (val: string) => void
  onDelete?: (id: string) => void
  onSort?: (list: ITagItem[], activeId: string, overId: string) => void
}

export default function Tags(props: Props) {
  const { list = [], onCreate, onDelete, onSort } = props
  const sensors = useSensors(useSensor(PointerSensor))
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return false
    if (active.id !== over.id) {
      const oldIndex = list.findIndex((item) => item.id === active.id)
      const newIndex = list.findIndex((item) => item.id === over.id)
      onSort?.(arrayMove(list, oldIndex, newIndex), active.id.toString(), over.id.toString())
    }
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={list} strategy={horizontalListSortingStrategy}>
          {list?.map((item) => <TagItem key={item.id} tag={item} onDelete={onDelete} />)}
        </SortableContext>
      </DndContext>
      <AddBtn onFinish={onCreate} />
    </>
  )
}
