import { useRef, useEffect } from 'react'
import { Button, Input, Form, Space, InputRef } from 'antd'
import { presets } from '@/common/constants/valid'

export interface Props {
  initialValue?: string
  onOk?: (val: string) => void
  onCancel?: () => void
}
export interface FormFields {
  title: string
}
export default function Edit(props: Props) {
  const { onOk, onCancel, initialValue } = props
  const inputRef = useRef<InputRef>(null)
  useEffect(() => {
    inputRef?.current?.focus?.()
  }, [])
  const handleCancel = () => onCancel?.()
  const handleFinish = (values: FormFields) => {
    onOk?.(values.title)
  }
  return (
    <Form layout="inline" onFinish={handleFinish} clearOnDestroy={true}>
      <Form.Item>
        <Space size={8}>
          <Form.Item
            noStyle
            name="title"
            initialValue={initialValue}
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input ref={inputRef} size="small" maxLength={presets.maxTitleLength} placeholder="请输入分类名称" />
          </Form.Item>
          <Space size={4}>
            <Button size="small" type="primary" htmlType="submit">
              确定
            </Button>
            <Button size="small" onClick={handleCancel}>
              取消
            </Button>
          </Space>
        </Space>
      </Form.Item>
    </Form>
  )
}
