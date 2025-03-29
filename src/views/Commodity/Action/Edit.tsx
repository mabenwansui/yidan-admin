'use client'
import { useMemo, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { App } from 'antd'
import Form, { CommodityFormItems } from '../ui/Form'
import { useGetInfo } from './api/useGetInfo'
import useUpdate from './api/useUpdate'

export default function Edit() {
  const { id } = useParams()
  const { data, isLoading } = useGetInfo(id as string)
  const { trigger: triggerUpdate } = useUpdate()
  const { message } = App.useApp()
  const initialValues = useMemo(() => {
    if (isLoading || !data) {
      return {}
    }
    const { category, ...rest } = data
    return {
      category: {
        value: category.id,
        label: category.title
      },
      ...rest
    }
  }, [isLoading, data])
  const handleFinish = useCallback(
    async (values: CommodityFormItems) => {
      const { category, ...rest } = values
      const { flag } = await triggerUpdate({
        ...rest,
        category: category?.value
      })
      if (flag === 1) {
        message.success('更新成功')
      }
    },
    [message, triggerUpdate]
  )
  return (
    <div className="max-w-xl mt-10">
      {isLoading === false && <Form initialValues={initialValues} onFinish={handleFinish} submitText="保存并更新" />}
    </div>
  )
}
