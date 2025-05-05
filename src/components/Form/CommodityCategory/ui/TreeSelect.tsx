import { useImperativeHandle, memo } from 'react'
import { TreeSelect as AntTreeSelect, TreeSelectProps } from 'antd'
import useGetList from '../hooks/useGetList'

export interface RefMethods {
  refresh: () => void
}
export interface Props extends TreeSelectProps {
  ref?: React.Ref<RefMethods>
  className?: string
}

export interface TreeSlectChangeValue {
  label: string
  value: string
}

function TreeSelect(props: Props) {
  const { list, refresh } = useGetList({ hasRootCategory: false })
  const { className, ref, ...rest } = props
  useImperativeHandle(ref, () => {
    return {
      refresh() {
        refresh()
      }
    }
  })
  return (
    <AntTreeSelect
      labelInValue={true}
      fieldNames={{
        value: 'id',
        label: 'title'
      }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="请选择分类"
      allowClear
      treeDefaultExpandAll
      treeData={list}
      className={className || ''}
      {...rest}
    />
  )
}
export default memo(TreeSelect)
