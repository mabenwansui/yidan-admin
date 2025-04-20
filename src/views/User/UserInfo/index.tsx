'use client'
import '@ant-design/v5-patch-for-react-19'
import { App } from 'antd'
import Form, { FormValues } from './ui/Form'
import { useGetUserInfo } from '@/common/hooks/useGetUserInfo'
import useUpdateUserInfo from './hooks/updateUserInfo'

export default function UserInfo() {
  const { trigger: triggerUpdateUserInfo } = useUpdateUserInfo()
  const { message } = App.useApp()
  const handleFinish = async (values: FormValues) => {
    const { flag } = await triggerUpdateUserInfo(values)
    if (flag === 1) {
      message.success('更新成功')
    }
  }
  const { data } = useGetUserInfo()
  return (
    <section className="form-wrap">{data?.data && <Form initialValues={data.data} onFinish={handleFinish} />}</section>
  )
}
