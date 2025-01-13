'use client'
import { useState, useEffect } from 'react'
import '@ant-design/v5-patch-for-react-19'
import { Form, Input, Button, Space, message } from 'antd'
import useSWR from 'swr'
import { getCaptchaApi, RegisterApiProps, registerApi } from './api'
import { ErrorCode } from '@/common/constants/errorCode'

export default function Register() {
  const [from] = Form.useForm()
  const [captchaIndex, setCaptchaIndex] = useState(1)
  const [messageApi, contextHolder] = message.useMessage()
  const { data, isLoading } = useSWR(`/api/captcha?index=${captchaIndex}`, getCaptchaApi, {
    revalidateOnFocus: false,
    refreshInterval: 120 * 1e3,
  })
  useEffect(() => {
    from.setFieldValue('captchaKey', data?.data?.key)
  }, [data?.data?.key, from])
  const onFormFinish = async (values: RegisterApiProps) => {
    const { username, password, captchaVal, captchaKey } = values
    const postData = {
      username,
      password,
      captchaVal,
      captchaKey,
    }
    const { flag, code } = await registerApi(postData)
    if (flag) {
      messageApi.info('注册成功，请登录')
    } else {
      switch (code) {
        case ErrorCode.CAPTCHA_ERROR:
          setCaptchaIndex(captchaIndex + 1)
          break
      }
    }
  }
  const onCaptchaClick = () => {
    setCaptchaIndex(captchaIndex + 1)
  }
  return (
    <div className="bg-white pl-7 pb-4 pt-9 rounded-xl">
      <div className="text-xl pb-6">易单管理平台 - 注册</div>
      {contextHolder}
      <Form
        form={from}
        className="register-form"
        requiredMark={false}
        colon={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFormFinish}
        initialValues={{
          username: 'maben1',
          password: 'maben614',
          confirmPassword: 'maben614',
        }}
      >
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="重复密码" rules={[{ required: true, message: '请输入密码', min: 6 }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="captchaKey" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="验证码">
          <Space>
            <Form.Item name="captchaVal" noStyle>
              <Input />
            </Form.Item>
            {!isLoading && data?.data?.data && (
              <div
                onClick={onCaptchaClick}
                className="*:w-32 *:h-9 absolute -top-1 hover:cursor-pointer"
                dangerouslySetInnerHTML={{ __html: data.data.data }}
              />
            )}
          </Space>
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
