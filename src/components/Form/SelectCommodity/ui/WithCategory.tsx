import { useState } from 'react'
import { Space } from 'antd'
import Select, { Props as SelectProps, ChangeProps, Option } from './Select'
import { TreeSelect, TreeSlectChangeValue, TreeSelectProps } from '@/components/Form/CommodityCategory'

interface Props extends Omit<SelectProps, 'onChange' | 'value'> {
  value?: Option
  onChange?: ChangeProps
  treeSelectProps?: TreeSelectProps
}
export default function WithCategory(props: Props) {
  const [categoryId, setCategoryId] = useState<string>()
  const { value, treeSelectProps = {}, ...rest } = props
  const handleCategoryChange = (item: TreeSlectChangeValue) => setCategoryId(item.value)
  return (
    <Space.Compact>
      <Select
        value={value}
        key={categoryId}
        categoryId={categoryId}
        placeholder="选择商品"
        className="min-w-62!"
        {...rest}
      />
      <TreeSelect
        placeholder="分类筛选"
        onChange={handleCategoryChange}
        className="min-w-30!"
        popupMatchSelectWidth={200}
        {...treeSelectProps}
      />
    </Space.Compact>
  )
}
