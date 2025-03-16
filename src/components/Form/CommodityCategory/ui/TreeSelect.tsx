import { useImperativeHandle, memo } from 'react'
import { TreeSelect as AntTreeSelect } from 'antd'
import useGetList from '../api/useGetList'

export interface RefMethods {
  refresh: () => void
}
export interface Props {
  ref?: React.Ref<RefMethods>
  className?: string
}

function TreeSelect(props: Props) {
  const { list, refresh } = useGetList()
  useImperativeHandle(props.ref, () => {
    return {
      refresh() {
        refresh()
      }
    }
  })
  return (
    <AntTreeSelect
      fieldNames={{
        value: 'id',
        label: 'title'
      }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="请选择分类"
      allowClear
      treeDefaultExpandAll
      treeData={list}
      className={props?.className}
    />
  )
}
export default memo(TreeSelect)
