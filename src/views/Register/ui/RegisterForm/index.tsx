'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState } from 'react'
import { Form, Input, Button, Space, App } from 'antd'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { RegisterApiProps, registerApiUrl, registerApiMutation } from './api'
import { ERROR_CODE } from '@/common/constants/errorCode'
import { useRouter } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Captcha from './Captcha'

export default function RegisterForm() {
  const [captchaIndex, setCaptchaIndex] = useState(1)
  const router = useRouter()
  const { message } = App.useApp()
  const { trigger } = useSWRMutation(registerApiUrl, registerApiMutation)
  const onFormFinish = async (values: RegisterApiProps) => {
    const { username, password, captchaVal, captchaKey } = values
    const postData = {
      username,
      password,
      captchaVal,
      captchaKey
    }
    const { flag, code } = await trigger(postData)
    if (flag) {
      message.info('注册成功，请登录')
      setTimeout(() => router.push(ROUTE_PATH.LOGIN), 1500)
    } else {
      switch (code) {
        case ERROR_CODE.CAPTCHA_ERROR:
        case ERROR_CODE.USER_ALREADY_USED:
          setCaptchaIndex(captchaIndex + 1)
          break
      }
    }
  }
  return (
    <div className="bg-white pl-7 pb-4 pt-9 rounded-xl">
      <div className="text-xl pb-7">易单管理平台 - 注册</div>
      <Form
        className="register-form"
        requiredMark={false}
        colon={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFormFinish}
        initialValues={{
          username: 'maben1',
          password: 'maben614',
          confirmPassword: 'maben614'
        }}
      >
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="重复密码"
          dependencies={['password']}
          rules={[
            { required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致'))
              }
            })
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="验证码">
          <Space>
            <Form.Item name="captchaVal" rules={[{ required: true, message: '请输入验证码' }]} noStyle>
              <Input />
            </Form.Item>
            <Captcha key={captchaIndex} />
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
