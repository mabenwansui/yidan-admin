'use client'
import '@ant-design/v5-patch-for-react-19'
import { Form, Button, Input } from 'antd'
import { useLogin } from './api'
// import { useAjaxTrigger } from '@/common/hooks/useAjax'

interface Values {
  username: string
  password: string
}

export default function Login() {
  const { trigger, isLoading } = useLogin()
  // const { trigger, isLoading } = useAjaxTrigger('/auth/login')
  // const result = useAjax<{ username: string; password: string }>('/auth/login', {
  //   username: 'maben',
  //   password: 'maben614',
  // })
  // console.log('result:::::::::', result)
  console.log('isLoading:::::::::', isLoading)
  const onFinish = async (values: Values) => {
    const { username, password } = values
    const result = await trigger({
      username,
      password,
    })
    console.log('Received values of form: result:::', result)
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
            password: 'maben614',
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
