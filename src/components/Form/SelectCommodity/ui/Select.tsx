import { memo } from 'react'
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { useDebouncedCallback } from 'use-debounce'
import useGetCommodityList from '../hooks/useGetCommodityList'

export interface Option {
  label: string
  value: string
}

export interface ChangeProps {
  (value: Option): void
}

export interface Props extends Omit<AntSelectProps, 'onChange' | 'value'> {
  value?: Option
  onChange?: ChangeProps
  categoryId?: string
}

function Select(props: Props) {
  const { value, categoryId, onChange, ...restProps } = props
  const { isLoading, options, fetch } = useGetCommodityList(value ? [value] : [])

  const handleSearch = useDebouncedCallback(async (value) => {
    fetch({ categoryId, name: value })
  }, 350)

  const handleChange: AntSelectProps['onChange'] = (value, item) => {
    onChange?.(item as Option)
  }
  const handleVisibleChange = async (visible: boolean) => {
    if (visible === true) {
      fetch({ categoryId })
    }
  }
  return (
    <AntSelect
      value={value?.value}
      showSearch
      placeholder="请选择"
      allowClear
      options={options}
      onSearch={handleSearch}
      filterOption={false}
      loading={isLoading}
      onDropdownVisibleChange={handleVisibleChange}
      onChange={handleChange}
      {...restProps}
    />
  )
}
export default memo(Select)
