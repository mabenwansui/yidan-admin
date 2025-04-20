import { useState, useEffect } from 'react'
import { Cascader as AntCascader, CascaderProps } from 'antd'
import useGetCityList, { Response } from '../hooks/useGetCityList'

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

export default function Cascader(props: CascaderProps<any>) {
  const [options, setOptions] = useState<Option[]>([])
  const { trigger } = useGetCityList()
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
  return (
    <AntCascader
      placeholder="请选择"
      changeOnSelect
      options={options}
      loadData={handleLoadData}
      popupClassName="[&_.ant-cascader-menu]:max-h-64 [&_.ant-cascader-menu]:h-auto!"
      {...props}
    />
  )
}
