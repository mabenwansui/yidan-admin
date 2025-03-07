'use client'
import { Form } from 'antd'
import FormItem from './ui/FormItems'
import { useRouter } from 'next/navigation'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { CreateCommodityProps, createCommodityApiUrl, createCommodityApiMutation } from './api'

export default function Edit() {
  const router = useRouter()
  const { trigger } = useSWRMutation(createCommodityApiUrl, createCommodityApiMutation)
  const handleFinish = async (values: CreateCommodityProps) => {
    const { name, imgNames, originalPrice, price } = values
    const { flag } = await trigger({
      name,
      imgNames,
      originalPrice,
      price
    })
    if (flag === 1) {
      router.push(`/commodity/sucess?backurl=${encodeURIComponent('/commodity/update')}`)
    }
  }
  return (
    <div className="max-w-xl mt-10">
      <Form
        name="commodityCreate"
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 19
        }}
        onFinish={handleFinish}
      >
        <FormItem />
      </Form>
    </div>
  )
}
