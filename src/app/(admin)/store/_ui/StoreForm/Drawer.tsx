'use client'
import { useRef, memo } from 'react'
import { DrawerProps } from 'antd'
import DrawerForm, { DrawerFormType } from '@/components/DrawerForm'
import Form, { RefMethods } from './StoreForm'
import { Store } from '@/common/types/store'

interface Props extends DrawerProps {
  type: DrawerFormType
  formKey: string | number
  initialValues?: Store
  onSubmit?: (values: Store) => void
}

function FormDrawer(props: Props) {
  const { onSubmit, initialValues, type, formKey, ...rest } = props
  const formRef = useRef<RefMethods>(null)
  const handleFinish = async (values: Store) => onSubmit?.(values)
  const handleDrawerSubmit = () => formRef.current?.submit()
  return (
    <DrawerForm type={type} onClose={props.onClose} onSubmit={handleDrawerSubmit} {...rest}>
      <Form ref={formRef} key={formKey} initialValues={initialValues} onFinish={handleFinish} showSubmitBtn={false} />
    </DrawerForm>
  )
}

export default memo(FormDrawer)
