'use client'
import { Form, Input, Button } from 'antd'
import Upload from './components/Upload'

export default function CommodityCreatePage() {
  return (
    <div>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
      >
        <Form.Item label="产品名称" name="commodityTitle" rules={[{ required: true, message: '请输入产品名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="图片上传" name="commodityUpload">
          <Upload name="img" />
        </Form.Item>
        <Form.Item label="金额" name="commodityPrice">
          <Input />
        </Form.Item>
        <Form.Item label="标签" name="commodityTags">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
