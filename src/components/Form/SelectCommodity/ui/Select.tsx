import { useMemo, memo, useState } from 'react'
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { useDebouncedCallback } from 'use-debounce'
import { Commodity } from '@/common/types/commodity'
import { useTriggerGetCommodityList } from '@/common/hooks/useGetCommodityList'

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
  const [list, setList] = useState<Commodity[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { trigger } = useTriggerGetCommodityList()
  const handleSearch = useDebouncedCallback(async (value) => {
    const { flag, data } = await trigger({ categoryId, name: value, pageSize: 80 })
    if (flag === 1) {
      setList(data.list)
    }
  }, 350)
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
  const handleVisibleChange = async (visible: boolean) => {
    if (visible === true && list === null) {
      setIsLoading(true)
      const { flag, data } = await trigger({ categoryId, pageSize: 80 })
      if (flag === 1) {
        setIsLoading(false)
        setList(data.list)
      }
    }
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
      onDropdownVisibleChange={handleVisibleChange}
      onChange={handleChange}
      {...restProps}
    />
  )
}
export default memo(Select)
