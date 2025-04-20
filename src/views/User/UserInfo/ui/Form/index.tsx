'use client'
import { memo, useMemo, Ref, useImperativeHandle, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import { presets } from '@/common/constants/valid'
import PhoneItem from '@/components/Form/PhoneItem'
import { User } from '@/common/types/user'

export interface RefMethods {
  submit: () => void
}

export type FormValues = Omit<User, 'role' | 'username'>

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  initialValues?: FormValues
}

function CustomForm(props: Props) {
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  const [form] = Form.useForm()
  const { onFinish, submitText = '保存并更新', ref, initialValues } = props

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
    <Form
      name="project-form"
      initialValues={initialValues}
      form={form}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={handleFinish}
    >
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item label="头像" className="[&_.ant-form-item-label]:pt-11">
        <div className="w-30 h-30 ml-4 bg-indigo-200 rounded-full justify-center flex items-center text-2xl">头像</div>
      </Form.Item>
      <Form.Item label="用户名" wrapperCol={{ span: 10 }}>
        {initialValues?.id}
      </Form.Item>
      <Form.Item
        name="nickname"
        label="昵称"
        wrapperCol={{ span: 10 }}
        rules={[
          { required: true, message: `请输入昵称` },
          { max: presets.nickNameLength, message: `昵称不能超过${presets.nickNameLength}个字` }
        ]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <PhoneItem
        name="phoneNumber"
        placeholder="请输入"
        label="手机号"
        validateFirst={true}
        wrapperCol={{ span: 10 }}
        rules={[{ required: true, message: `请输入手机号` }]}
      />
      <Form.Item name="email" label="邮箱" wrapperCol={{ span: 10 }}>
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }} className="form-action">
        <Button className="min-w-24" size="large" type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(CustomForm)
