import { useMemo, memo } from 'react'
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { useDebouncedCallback } from 'use-debounce'
import { Commodity } from '@/common/types/commodity'
import useCommoditySearch from '@/common/hooks/useGetCommodityList'

export interface Option {
  label: string
  value: string
}

export interface ChangeProps {
  (value: string, option: Option, item?: Commodity): void
}

export interface Props extends Omit<AntSelectProps, 'onChange'> {
  onChange?: ChangeProps
  categoryId?: string
}

function Select(props: Props) {
  const { categoryId, onChange, ...restProps } = props
  const { list, isLoading, refresh } = useCommoditySearch({ categoryId, pageSize: 100 })
  const handleSearch = useDebouncedCallback((value) => refresh({ name: value }), 500)
  const options = useMemo(
    () =>
      list?.map((item) => ({
        label: item.name,
        value: item.id
      })),
    [list]
  )
  const handleChange: AntSelectProps['onChange'] = (value, item) => {
    onChange?.(
      value,
      item as Option,
      list?.find((item) => item.id === value)
    )
  }
  return (
    <AntSelect
      showSearch
      placeholder="请选择"
      allowClear
      options={options}
      onSearch={handleSearch}
      filterOption={false}
      loading={isLoading}
      onChange={handleChange}
      {...restProps}
    />
  )
}
export default memo(Select)
