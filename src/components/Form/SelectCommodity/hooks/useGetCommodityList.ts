import { useState } from 'react'
import { SelectProps } from 'antd'
import { useTriggerGetCommodityList } from '@/common/hooks/commodity/useGetCommodityList'

interface FetchParams {
  categoryId?: string
  name?: string
}

export default function useGetCommodityList(defaultOptions: SelectProps['options']) {
  const [options, setOptions] = useState<SelectProps['options']>(defaultOptions)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { trigger } = useTriggerGetCommodityList()

  async function fetch(params: FetchParams) {
    const { categoryId, name } = params
    setIsLoading(true)
    const { flag, data } = await trigger({ categoryId, name, pageSize: 80 })
    setIsLoading(false)
    if (flag === 1) {
      setOptions(
        data.list?.map((item) => ({
          label: item.name,
          value: item.id
        }))
      )
    }
  }
  return {
    options,
    isLoading,
    fetch
  }
}
