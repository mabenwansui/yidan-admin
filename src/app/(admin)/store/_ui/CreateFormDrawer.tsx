'use client'
import { useRef, memo } from 'react'
import { App, DrawerProps } from 'antd'
import useCreate from '../_hooks/useCreate'
import DrawerForm, { DrawerFormType } from '@/components/DrawerForm'
import Form, { RefMethods } from './StoreForm'
import { Store } from '@/common/types/store'

interface Props extends DrawerProps {
  onSubmit?: () => void
}

function FormDrawer(props: Props) {
  const { onSubmit, ...rest } = props
  const { trigger } = useCreate()
  const { message } = App.useApp()
  const formRef = useRef<RefMethods>(null)
  const handleFinish = async (values: Store) => {
    const { id: _, ...rest } = values
    const { flag } = await trigger(rest)
    if (flag === 1) {
      onSubmit?.()
      message.success('创建成功')
      formRef.current?.resetFields()
    }
  }
  const handleDrawerSubmit = () => formRef.current?.submit()

  return (
    <DrawerForm type={DrawerFormType.CREATE} onClose={props.onClose} onSubmit={handleDrawerSubmit} {...rest}>
      <Form ref={formRef} onFinish={handleFinish} showSubmitBtn={false} />
    </DrawerForm>
  )
}

export default memo(FormDrawer)
