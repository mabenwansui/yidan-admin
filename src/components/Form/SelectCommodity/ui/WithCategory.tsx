import { useState } from 'react'
import { Space } from 'antd'
import Select, { Props as SelectProps, ChangeProps } from './Select'
import { TreeSelect, TreeSlectChangeValue, TreeSelectProps } from '../../CommodityCategory'

interface Props extends Omit<SelectProps, 'onChange'> {
  onChange?: ChangeProps
  treeSelectProps?: TreeSelectProps
}
export default function WithCategory(props: Props) {
  const [categoryId, setCategoryId] = useState<string>()
  const { treeSelectProps = {}, ...rest } = props
  const handleCategoryChange = (item: TreeSlectChangeValue) => setCategoryId(item.value)
  return (
    <Space.Compact>
      <TreeSelect
        placeholder="全部分类"
        onChange={handleCategoryChange}
        className="min-w-30!"
        popupMatchSelectWidth={200}
        {...treeSelectProps}
      />
      <Select key={categoryId} categoryId={categoryId} placeholder="选择商品" className="min-w-62!" {...rest} />
    </Space.Compact>
  )
}
