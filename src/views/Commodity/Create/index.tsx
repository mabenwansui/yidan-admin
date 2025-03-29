'use client'
import '@ant-design/v5-patch-for-react-19'
import { useCallback } from 'react'
import Form, { CommodityFormItems } from '../ui/Form'
import { useRouter } from 'next/navigation'
import useCreate from './api/useCreate'

export default function Create() {
  const router = useRouter()
  const { trigger: triggerCreate } = useCreate()

  const handleFinish = useCallback(
    async (values: CommodityFormItems) => {
      const { category, imgNames, ...rest } = values
      const { flag } = await triggerCreate({
        ...rest,
        imgNames: imgNames?.map((item) => item.name) || [],
        category: category?.value
      })
      if (flag === 1) {
        router.push(`/commodity/sucess?backurl=${encodeURIComponent('/commodity/create')}`)
      }
    },
    [router, triggerCreate]
  )
  return (
    <div className="max-w-xl mt-10">
      <Form onFinish={handleFinish} submitText="创建" />
    </div>
  )
}
