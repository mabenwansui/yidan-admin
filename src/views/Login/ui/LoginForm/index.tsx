'use client'
import '@ant-design/v5-patch-for-react-19'
import { Form, Button, Input, App } from 'antd'
import { loginApiUrl, LoginApiProps, loginApiMutation } from './api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSWRMutation } from '@/common/hooks/useAjax'

export default function LoginForm() {
  const { message } = App.useApp()
  const router = useRouter()
  const params = useSearchParams()
  const { trigger } = useSWRMutation(loginApiUrl, loginApiMutation)
  const backUrl = params.get('backurl')

  const onFinish = async (values: LoginApiProps) => {
    const { username, password } = values
    const { flag } = await trigger({ username, password })
    if (flag === 1) {
      message.success('登录成功！跳转中...')
      setTimeout(() => router.push(backUrl ? backUrl : '/'), 1000)
    }
  }
  return (
    <>
      <div className="bg-white rounded-lg ps-6 py-2">
        <div className="text-xl py-4">易单管理平台</div>
        <Form
          className="mt-4"
          requiredMark={false}
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          initialValues={{
            username: 'maben',
            password: 'maben614'
          }}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="邮箱或手机号" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
