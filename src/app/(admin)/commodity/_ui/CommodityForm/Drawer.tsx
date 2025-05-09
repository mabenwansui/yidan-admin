'use client'
import { useRef, memo } from 'react'
import { DrawerProps } from 'antd'
import DrawerForm, { DrawerFormType } from '@/components/DrawerForm'
import Loading from '@/components/Loading/Component'
import Form, { RefMethods, CommodityForm, CommoditySubmitValues } from './Form'

interface Props extends DrawerProps {
  type: DrawerFormType
  formKey?: string | number
  initialValues?: CommodityForm
  isLoading?: boolean
  onSubmit?: (values: CommoditySubmitValues) => void
}

export { DrawerFormType }
export type { CommoditySubmitValues }

function FormDrawer(props: Props) {
  const { onSubmit, initialValues, type, formKey, isLoading = false, ...rest } = props
  const formRef = useRef<RefMethods>(null)
  const handleFinish = async (values: CommoditySubmitValues) => onSubmit?.(values)
  const handleDrawerSubmit = () => formRef.current?.submit()
  return (
    <DrawerForm type={type} onClose={props.onClose} onSubmit={handleDrawerSubmit} {...rest}>
      {isLoading === true ? (
        <Loading />
      ) : (
        <Form ref={formRef} key={formKey} initialValues={initialValues} onFinish={handleFinish} showSubmitBtn={false} />
      )}
    </DrawerForm>
  )
}

export default memo(FormDrawer)
