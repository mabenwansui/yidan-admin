'use client'
import '@ant-design/v5-patch-for-react-19'
import { Form, Button } from 'antd'
import FormItems from './ui/FormItems'
import { useRouter } from 'next/navigation'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { CreateCommodityProps, createCommodityApiUrl, createCommodityApiMutation } from './api'

export default function Create() {
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
      router.push(`/commodity/sucess?backurl=${encodeURIComponent('/commodity/create')}`)
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
        <FormItems />
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button className="w-22" type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
