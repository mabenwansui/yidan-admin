'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState, useEffect, Key, useRef } from 'react'
import Loading from '@/components/Loading/Component'
import { Tree as AntTree, TreeDataNode, TreeProps, App, Alert } from 'antd'
import useGetList from '../hooks/useGetList'
import useCreate from '../hooks/useCreate'
import useDelete from '../hooks/useDelete'
import useUpdate from '../hooks/useUpdate'
import useSort from '../hooks/useSort'
import Item from './Item'
import { getNextState } from '../utils'

export interface Props {
  maxLevel?: number
  onChange?: () => void
}

export interface ListItem {
  id: string
  title: string
  level: number
  isEdit?: boolean
  parentId: string
  unnamed?: boolean // 新建时将此属性设为true
  children?: ListItem[]
}

export default function CommodityCategory(props: Props) {
  const { list, isLoading, refresh } = useGetList()
  const { trigger: create } = useCreate()
  const { trigger: del } = useDelete()
  const { trigger: update } = useUpdate()
  const { trigger: sort } = useSort()
  const mounted‌Ref = useRef<boolean>(false)

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [treeData, setTreeData] = useState<ListItem[]>([])
  const { message } = App.useApp()
  useEffect(() => {
    if (isLoading === false && list.length > 0) {
      setTreeData(list)
      if (mounted‌Ref.current === false) {
        mounted‌Ref.current = true
        setTimeout(() => {
          setExpandedKeys([list[0].id])
        }, 100)
      }
    }
  }, [list, isLoading])
  const { maxLevel = 999, onChange } = props
  const onDrop: TreeProps['onDrop'] = async (info) => {
    const { dragNode, node, dropToGap } = info
    const dragId = dragNode.key as string
    const nodeId = node.key as string
    const { flag } = await sort({ id: dragId, targetId: nodeId, isGap: dropToGap })
    if (flag === 1) {
      refresh()
      onChange?.()
    }
  }
  const handleDelete = async (item: ListItem) => {
    const { id } = item
    const { flag } = await del(id)
    if (flag === 1) {
      message.success('删除成功')
      refresh()
    }
    onChange?.()
  }
  const handleCreate = (item: ListItem) => {
    const { id, level } = item
    const _id = `__${Date.now()}`
    const nextState = getNextState(treeData, id, (item) => {
      const itemData = {
        id: _id,
        parentId: id,
        level: level + 1,
        title: '',
        isEdit: true,
        unnamed: true
      }
      if (!item.children) item.children = []
      item.children.push(itemData)
    })
    setTreeData(nextState)
    setExpandedKeys([...new Set([...expandedKeys, id])])
  }
  const handleUpdate = async (title: string, item: ListItem, close: () => void) => {
    const { id, parentId } = item
    if (item.unnamed === true) {
      const { flag, data } = await create({ title: title, parentId })
      if (flag === 1 && data) {
        const nextState = getNextState(treeData, id, (item) => {
          item.id = data.id
          item.title = data.title
          item.parentId = data.parentId
          item.level = data.level
          delete item.unnamed
          delete item.isEdit
        })
        setTreeData(nextState)
      }
    } else {
      const { flag } = await update({ id: item.id, title })
      if (flag === 1) {
        close()
        refresh()
      }
    }
    onChange?.()
  }
  const handleEditCancel = (item: ListItem) => {
    const { unnamed, id, parentId } = item
    if (unnamed === true) {
      const nextState = getNextState(treeData, parentId, (item) => {
        if (item.children) {
          item.children = item?.children.filter((_item) => _item.id !== id)
        } else {
          return item
        }
      })
      setTreeData(nextState)
    }
  }
  const handleExpand: TreeProps['onExpand'] = (key) => {
    setExpandedKeys(key)
  }
  const hadleAllowDrop: TreeProps['allowDrop'] = ({ dropNode, dropPosition }) => {
    const _node = dropNode as unknown as ListItem
    if (_node.level === 0 && dropPosition !== 0) {
      return false
    } else {
      return _node.level < maxLevel || dropPosition !== 0
    }
  }
  const handleDraggable: TreeProps['draggable'] = (node) => {
    const _node = node as unknown as ListItem
    return _node.level !== 0
  }
  const render = () => {
    if (isLoading === true) {
      return <Loading />
    } else {
      return (
        <div className="component-commodity-category mt-4 min-h-50">
          <Alert className="mb-4!" message="点击 + 号, 创建分类" banner />
          <AntTree
            allowDrop={hadleAllowDrop}
            className="draggable-tree"
            fieldNames={{ key: 'id' }}
            draggable={handleDraggable}
            blockNode
            expandedKeys={expandedKeys}
            onDrop={onDrop}
            onExpand={handleExpand}
            treeData={treeData as unknown as TreeDataNode[]}
            titleRender={(nodeData: unknown) => {
              const node = nodeData as ListItem
              return (
                <Item
                  data={node}
                  maxLevel={maxLevel}
                  onCreate={handleCreate}
                  onEditOk={handleUpdate}
                  onEditCancel={handleEditCancel}
                  onDelete={handleDelete}
                />
              )
            }}
          />
        </div>
      )
    }
  }
  return render()
}
