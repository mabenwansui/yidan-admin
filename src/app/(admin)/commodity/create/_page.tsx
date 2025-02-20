'use client'
import { useState } from 'react'
import { Form, Input, Button, InputNumber, Space } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { presets } from '@/common/constants/valid'
import Upload from '../../../../views/Commodity/Action/ui/Upload'
import { CreateCommodityProps, createCommodityApiUrl, createCommodityApiMutation } from '../../../../views/Commodity/Action/api'
import { useRouter } from 'next/navigation'

export default function CommodityCreatePage() {
  const [discount, setDiscount] = useState<number>(0)
  const { trigger } = useSWRMutation(createCommodityApiUrl, createCommodityApiMutation)
  const router = useRouter()
  const handleFinish = async (values: CreateCommodityProps) => {
    console.log('values:', values)
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
  const handleValuesChange = (changedValues: Partial<CreateCommodityProps>, allValues: CreateCommodityProps) => {
    if (changedValues.originalPrice || changedValues.price) {
      const { originalPrice, price } = allValues
      if (originalPrice && price && originalPrice > price) {
        const discount = parseFloat((price / originalPrice).toFixed(2))
        setDiscount(discount)
      } else {
        setDiscount(0)
      }
    }
  }
  const { maxTitleLength } = presets
  return (
    <div className="max-w-xl">
      <Form
        name="commodityCreate"
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 19
        }}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[
            { required: true, message: '请输入产品名称' },
            { max: maxTitleLength, message: `商品名称不能超过${maxTitleLength}个字` }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="图片上传" name="imgNames">
          <Upload name="imgUpload" />
        </Form.Item>
        <Form.Item label="商品原价" name="originalPrice" rules={[{ required: true, message: '商品原价' }]}>
          <InputNumber className="!w-36" min={0} addonAfter="元" />
        </Form.Item>
        <Form.Item label="商品现价">
          <Space>
            <Form.Item noStyle name="price" rules={[{ required: true, message: '请输入商品现价' }]}>
              <InputNumber className="!w-36" min={0} addonAfter="元" />
            </Form.Item>
            {discount > 0 && (
              <span className="text-zinc-500 ml-2">
                <InfoCircleOutlined /> {discount}折
              </span>
            )}
          </Space>
        </Form.Item>
        <Form.Item label="商品描述" name="description" rules={[{ required: true, message: '请输入产品名称' }]}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button className="w-22" type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
