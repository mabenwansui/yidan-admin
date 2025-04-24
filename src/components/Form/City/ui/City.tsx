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
  // 取和文字, 避免每次查看都需要请求第三方接口增加费用，缺点是修改时无法定位，只能按层级重新选择
  const val: any = useMemo(() => value?.map((item) => item.label), [value])
  useEffect(() => {
    async function fetcher() {
      const { flag, data } = await trigger({ keyword: '' })
      if (flag === 1) {
        const optionsData = format(data)
        setOptions(optionsData)
      }
    }
    fetcher()
  }, [trigger])
  const handleLoadData = async (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1] // 等于selectedOptions[0]
    const { flag, data } = await trigger({ keyword: targetOption.value })
    if (flag === 1) {
      targetOption.children = format(data!)
      setOptions([...options])
    }
  }
  const handleChange = (_: any, selectedOptions: Option[]) => {
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

// function setOptionsData(options: Option[], values: ICity = []) {
//   if (!values || values.length <= 0) return
//   const curVal = values.shift()!
//   const item = options.find((item) => item.value === curVal.value)
//   if (item && values.length > 0) {
//     item.children = item.children || []
//     setOptionsData(item.children, values)
//   } else {
//     options.push({
//       value: curVal.value!,
//       label: curVal.label
//     })
//     if (values.length > 0) {
//       const children = (options[options.length - 1].children = [])
//       setOptionsData(children, values)
//     }
//   }
// }

// if (value && value.length > 0) {
//   const _value = [...value]
//   setOptionsData(optionsData, _value)
// }
// console.log('maben::', optionsData)
