'use client'
import { useState, useRef, useMemo, useCallback, useImperativeHandle, Ref } from 'react'
import { Form, Input, InputNumber, Space, Button, UploadFile } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { presets } from '@/common/constants/valid'
import { TreeSelect, CategoryModal, TreeSelectRefMethods } from '@/components/Form/CommodityCategory'
import FormItemDetails from './FormItemDetails'
import { Commodity } from '@/common/types/commodity'
import ImgUpload from '@/components/Form/Upload/ImgUpload'

export type CommodityFormItems = Omit<Commodity, 'category' | 'imgNames'> & {
  imgNames: UploadFile[]
  category: {
    value: string
    label: string
  }
}
export interface RefMethods {
  submit: () => void
}

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  initialValues?: CommodityFormItems | Record<never, never>
}

export default function CustomForm(props: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [form] = Form.useForm()
  const originalPrice = Form.useWatch('originalPrice', form)
  const price = Form.useWatch('price', form)
  const categoryRef = useRef<TreeSelectRefMethods | null>(null)
  const { initialValues, showSubmitBtn = true, onFinish, submitText = '提交', ref } = props
  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        form.submit()
      }
    }),
    [form]
  )
  const discount = useMemo(() => {
    if (originalPrice && price && originalPrice > price) {
      return parseFloat((price / originalPrice).toFixed(2))
    } else {
      return 0
    }
  }, [originalPrice, price])

  const { maxTitleLength } = presets
  const handleCategory = () => setShowCategoryModal(true)
  const handleCategoryModalClose = (isChange: boolean) => {
    setShowCategoryModal(false)
    if (isChange) {
      categoryRef.current?.refresh()
    }
  }
  const handleFinish = useCallback((values: CommodityFormItems) => onFinish?.(values), [onFinish])
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  return (
    <Form
      name="commodity-form"
      initialValues={initialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      form={form}
      onFinish={handleFinish}
    >
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
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
          <div className="w-96">
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
      <Form.Item label="图片上传" valuePropName="fileList" name="imgNames">
        <ImgUpload />
      </Form.Item>
      <Form.Item label="商品原价" name="originalPrice" rules={[{ required: true, message: '商品原价' }]}>
        <InputNumber className="!w-36" min={0} addonAfter="元" />
      </Form.Item>
      <Form.Item label="商品现价" required>
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
      <Form.Item label="已售" name="soldCount">
        <Input />
      </Form.Item>
      <Form.Item label="商品详情" name="details">
        <FormItemDetails />
      </Form.Item>
      {showSubmitBtn && (
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button className="min-w-24" size="large" type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
