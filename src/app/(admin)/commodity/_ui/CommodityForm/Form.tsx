'use client'
import { useState, useRef, useMemo, useEffect, useCallback, useImperativeHandle, Ref } from 'react'
import { Form, Input, Space, Button, UploadFile } from 'antd'
import { presets } from '@/common/constants/valid'
import { TreeSelect, CategoryModal, TreeSelectRefMethods } from '@/components/Form/CommodityCategory'
import Details from './Details'
import { Commodity } from '@/common/types/commodity'
import ImgUpload from '@/components/Form/Upload/ImgUpload'

interface SelectOption {
  value: string
  label: string
}
export type CommodityForm = Omit<Commodity, 'category' | 'imgNames'> & {
  imgNames?: UploadFile[]
  category?: SelectOption
}

export type CommoditySubmitValues = Omit<Commodity, 'category' | 'imgNames'> & {
  imgNames?: UploadFile[]
  category?: SelectOption
}

export interface RefMethods {
  submit: () => void
}

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  initialValues?: CommodityForm | Record<never, never>
}

const { maxTitleLength } = presets

export default function CustomForm(props: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [form] = Form.useForm()
  const categoryRef = useRef<TreeSelectRefMethods | null>(null)
  const { initialValues, showSubmitBtn = true, onFinish, submitText = '提交', ref } = props
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])
  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        form.submit()
      }
    }),
    [form]
  )

  const handleCategory = () => setShowCategoryModal(true)
  const handleCategoryModalClose = (isChange: boolean) => {
    setShowCategoryModal(false)
    if (isChange) {
      categoryRef.current?.refresh()
    }
  }
  const handleFinish = useCallback((values: CommoditySubmitValues) => onFinish?.(values), [onFinish])
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  return (
    <Form labelCol={labelCol} wrapperCol={wrapperCol} form={form} onFinish={handleFinish}>
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item
        label="商品名称"
        name="name"
        rules={[
          { required: true, message: '请输入商品名称' },
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
          <a onClick={handleCategory} className="ml-1">
            管理分类
          </a>
          <CategoryModal maxLevel={2} open={showCategoryModal} onClose={handleCategoryModalClose} />
        </Space>
      </Form.Item>
      <Form.Item label="图片上传" valuePropName="fileList" name="imgNames">
        <ImgUpload />
      </Form.Item>
      <Form.Item label="商品描述" name="description" rules={[{ required: true, message: '请输入商品描述' }]}>
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item label="商品详情" name="details">
        <Details />
      </Form.Item>
      {showSubmitBtn && (
        <Form.Item wrapperCol={{ offset: 5 }} className="form-action">
          <Button className="min-w-24" size="large" type="primary" htmlType="submit">
            {submitText}
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
