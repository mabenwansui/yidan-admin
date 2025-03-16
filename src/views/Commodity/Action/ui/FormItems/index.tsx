'use client'
import { useState, useEffect, useRef } from 'react'
import { Form, Input, InputNumber, Space, Button } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { presets } from '@/common/constants/valid'
import Upload from '@/views/Commodity/Action/ui/Upload'
import { TreeSelect, CategoryModal, TreeSelectRefMethods } from '@/components/Form/CommodityCategory'
import EditorContent from '@/components/Form/EditorContent'

export default function FormItems() {
  const [discount, setDiscount] = useState<number>(0)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const originalPrice = Form.useWatch('originalPrice')
  const price = Form.useWatch('price')
  const categoryRef = useRef<TreeSelectRefMethods | null>(null)
  useEffect(() => {
    if (originalPrice && price && originalPrice > price) {
      const discount = parseFloat((price / originalPrice).toFixed(2))
      setDiscount(discount)
    } else {
      setDiscount(0)
    }
  }, [originalPrice, price])
  const { maxTitleLength } = presets
  const handleCategory = () => {
    setShowCategoryModal(true)
  }
  const handleCategoryModalClose = (isChange: boolean) => {
    setShowCategoryModal(false)
    if (isChange) {
      categoryRef.current?.refresh()
    }
  }
  return (
    <>
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
      <Form.Item label="商品分类" required>
        <Space>
          <div className="w-97">
            <Form.Item noStyle name="category" rules={[{ required: true, message: '请选择商品分类' }]}>
              <TreeSelect ref={categoryRef} />
            </Form.Item>
          </div>
          <Button onClick={handleCategory} size="small" type="link">
            管理分类
          </Button>
          <CategoryModal maxLevel={2} open={showCategoryModal} onClose={handleCategoryModalClose} />
        </Space>
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
      <Form.Item label="商品详情" name="">
        <EditorContent />
      </Form.Item>
    </>
  )
}
