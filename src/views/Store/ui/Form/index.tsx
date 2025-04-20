import { memo, useMemo, Ref, useImperativeHandle, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { presets } from '@/common/constants/valid'
import ImgUpload from '@/components/Form/Upload/ImgUpload'
import City from '@/components/Form/City'
const { maxTitleLength } = presets

const label = {
  projectName: '店铺'
}
export interface RefMethods {
  submit: () => void
}

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  // initialValues?: CommodityFormItems | Record<never, never>
}

function CustomForm(props: Props) {
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  const [form] = Form.useForm()
  const { onFinish, submitText = '提交', ref } = props
  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        form.submit()
      }
    }),
    [form]
  )
  const handleFinish = useCallback((values: any) => onFinish?.(values), [onFinish])
  return (
    <Form name="project-form" form={form} labelCol={labelCol} wrapperCol={wrapperCol} onFinish={handleFinish}>
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item
        label={`${label.projectName}名称`}
        name="name"
        rules={[
          { required: true, message: `请输入${label.projectName}名称` },
          { max: maxTitleLength, message: `${label.projectName}名称不能超过${maxTitleLength}个字` }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="owner" label={`${label.projectName}负责人`}>
        <Input placeholder="请输入负责人" />
      </Form.Item>
      <Form.Item label={`${label.projectName}描述`} name="description">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item label={`${label.projectName}图片`} valuePropName="fileList" name="imgNames">
        <ImgUpload />
      </Form.Item>
      <Form.Item label={`所在城市`} name="city">
        <City />
      </Form.Item>
      <Form.Item label={`详细地址`} name="address">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button className="min-w-24" size="large" type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(CustomForm)
