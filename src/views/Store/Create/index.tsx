'use client'
import Form from '../ui/StoreForm'
import useCreate from '../hooks/useCreate'
import { Store } from '@/common/types/store'
import { App } from 'antd'

export default function Create() {
  const { trigger } = useCreate()
  const { message } = App.useApp()
  const handleFinish = async (values: Store) => {
    const { id: _, ...rest } = values
    const { flag } = await trigger(rest)
    if (flag === 1) {
      message.success('创建成功')
    }
  }
  return (
    <section className="max-w-xl pt-2">
      <Form onFinish={handleFinish} />
    </section>
  )
}
