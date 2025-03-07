import React, { useState, useEffect, useRef } from 'react'
import { Button, Popconfirm } from 'antd'
import { EditFilled, DeleteFilled, PlusCircleFilled } from '@ant-design/icons'
import cs from 'classnames'
import Edit from './Edit'
import { ListItem } from './Tree'

interface Props {
  data: ListItem
  maxLevel?: number
  onCreate?: (item: ListItem) => void
  onEditOk?: (categoryName: string, item: ListItem, closeFn: () => void) => void
  onEditCancel?: (item: ListItem) => void
  onDelete?: (item: ListItem) => void
}

export default function Item(props: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const { onCreate, onEditOk, onEditCancel, onDelete, data, maxLevel } = props
  const { id, title, level } = data
  useEffect(() => {
    if (data?.isEdit) {
      setIsEdit(data.isEdit)
    }
  }, [data?.isEdit])
  const handleCreate = () => onCreate?.(data)
  const handleEdit = () => setIsEdit(true)
  const handleEditOk = (categoryName: string) => onEditOk?.(categoryName, data, () => setIsEdit(false))
  const handleEditCancel = () => {
    setIsEdit(false)
    onEditCancel?.(data)
  }
  const handleDelete = () => onDelete?.(data)
  const handleOpenChange = (open: boolean) => {
    setIsSelected(open)
  }
  const renderEditBtn = () => {
    if (id !== '0') {
      return <Button size="small" type="link" icon={<EditFilled />} onClick={handleEdit} />
    } else {
      return null
    }
  }
  const renderDeleteBtn = () => {
    if (id !== '0') {
      return (
        <Popconfirm
          title="确认删除"
          onOpenChange={handleOpenChange}
          description="确认要删除这个分类？"
          onConfirm={handleDelete}
        >
          <Button size="small" type="link" icon={<DeleteFilled />} />
        </Popconfirm>
      )
    } else {
      return null
    }
  }
  const renderCreateBtn = () => {
    if (maxLevel && level < maxLevel) {
      return <Button size="small" type="link" icon={<PlusCircleFilled />} onClick={handleCreate} />
    } else {
      return null
    }
  }
  return (
    <div ref={wrapRef} data-path-id={id}>
      {isEdit === true ? (
        <Edit initialValue={title} onCancel={handleEditCancel} onOk={handleEditOk} />
      ) : (
        <div className="flex group">
          <span>{title}</span>
          <aside className={cs({ hidden: id === '0' ? false : !isSelected }, 'group-hover:inline-block', 'ml-6')}>
            {renderEditBtn()}
            {renderDeleteBtn()}
            {renderCreateBtn()}
          </aside>
        </div>
      )}
    </div>
  )
}
