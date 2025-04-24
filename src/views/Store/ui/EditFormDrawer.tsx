'use client'
import { useRef, memo } from 'react'
import { App, DrawerProps } from 'antd'
import useUpDate from '../hooks/useUpdate'
import DrawerForm, { DrawerFormType } from '@/components/DrawerForm'
import Form, { RefMethods } from './StoreForm'
import { Store } from '@/common/types/store'

interface Props extends DrawerProps {
  initialValues?: Store
  onSubmit?: () => void
}

function FormDrawer(props: Props) {
  const { onSubmit, initialValues, ...rest } = props
  const { trigger } = useUpDate()
  const { message } = App.useApp()
  const formRef = useRef<RefMethods>(null)
  const handleFinish = async (values: Store) => {
    const { flag } = await trigger(values)
    if (flag === 1) {
      onSubmit?.()
      message.success('更新成功')
      formRef.current?.resetFields()
    }
  }
  const handleDrawerSubmit = () => formRef.current?.submit()
  return (
    <DrawerForm type={DrawerFormType.EDIT} onClose={props.onClose} onSubmit={handleDrawerSubmit} {...rest}>
      <Form
        ref={formRef}
        key={`${initialValues?.id}_key`}
        initialValues={initialValues}
        onFinish={handleFinish}
        showSubmitBtn={false}
      />
    </DrawerForm>
  )
}

export default memo(FormDrawer)
