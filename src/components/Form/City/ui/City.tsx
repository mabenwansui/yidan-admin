import { useState, useMemo, useEffect, memo } from 'react'
import { Cascader as AntCascader, CascaderProps } from 'antd'
import useGetCityList, { Response } from '../hooks/useGetCityList'
import { City as ICity } from '@/common/types/city'

interface Option {
  value: string
  label?: React.ReactNode
  children?: Option[]
}

function format(data: Response[]): Option[] {
  return data.map((item) => {
    return {
      value: item.gb,
      label: item.name,
      isLeaf: item.level <= 2,
      children: []
    }
  })
}

type Props = Omit<CascaderProps<Option, any, any>, 'onChange' | 'value'> & {
  value?: ICity
  onChange?: (value: Option[]) => void
}

function City(props: Props) {
  const { value, onChange, ...restProps } = props
  const [options, setOptions] = useState<Option[]>([])
  const { trigger } = useGetCityList()
  const val: any = useMemo(() => value?.map((item) => item.value), [value])
  useEffect(() => {
    async function fetcher() {
      const { flag, data } = await trigger({ keyword: '' })
      if (flag === 1) {
        setOptions(format(data))
      }
    }
    fetcher()
  }, [trigger])
  const handleLoadData = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    const { flag, data } = await trigger({ keyword: targetOption.value })
    if (flag === 1) {
      targetOption.children = format(data!)
      setOptions([...options])
    }
  }
  const handleChange = (_: string[], selectedOptions: Option[]) => {
    onChange?.(
      selectedOptions.map((item) => ({
        value: item.value,
        label: item.label
      }))
    )
  }
  return (
    <AntCascader
      value={val}
      placeholder="请选择"
      changeOnSelect
      options={options}
      loadData={handleLoadData}
      popupClassName="[&_.ant-cascader-menu]:max-h-64 [&_.ant-cascader-menu]:h-auto!"
      onChange={handleChange}
      {...restProps}
    />
  )
}

export default memo(City)
