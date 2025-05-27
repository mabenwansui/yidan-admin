'use client'
import { useRef, memo } from 'react'
import { DrawerProps } from 'antd'
import DrawerForm, { DrawerFormType } from '@/components/DrawerForm'
import Form, { RefMethods } from './Form'
import { StoreForm } from '@/common/types/store'

interface Props extends DrawerProps {
  type: DrawerFormType
  formKey?: string | number
  initialValues?: StoreForm
  onSubmit?: (values: StoreForm) => void
}

export { DrawerFormType }

function FormDrawer(props: Props) {
  const { onSubmit, initialValues, type, formKey, ...rest } = props
  const formRef = useRef<RefMethods>(null)
  const handleFinish = async (values: StoreForm) => onSubmit?.(values)
  const handleDrawerSubmit = () => formRef.current?.submit()
  return (
    <DrawerForm type={type} onClose={props.onClose} onSubmit={handleDrawerSubmit} {...rest}>
      {formKey && (
        <Form ref={formRef} key={formKey} initialValues={initialValues} onFinish={handleFinish} showSubmitBtn={false} />
      )}
    </DrawerForm>
  )
}

export default memo(FormDrawer)
