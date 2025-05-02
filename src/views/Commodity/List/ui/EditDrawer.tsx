'use client'
import { useMemo, useRef, memo } from 'react'
import { App, Drawer, DrawerProps, Space, Button } from 'antd'
import Form, { CommodityForm, RefMethods } from '../../ui/Form'
import { useGetInfo } from '../api/useGetInfo'
import useUpdate from '../api/useUpdate'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'

interface Props extends DrawerProps {
  onSubmit?: () => void
  id: string
}

function EditDrawer(props: Props) {
  const { id, onSubmit, ...rest } = props
  const formRef = useRef<RefMethods>(null)
  const { data, isLoading } = useGetInfo(id as string)
  const { trigger: triggerUpdate } = useUpdate()
  const { message } = App.useApp()
  const initialValues = useMemo(() => {
    if (isLoading || !data) {
      return {}
    }
    const { category, imgNames, ...rest } = data
    return {
      imgNames: imgNames?.map((item) => ({
        uid: item,
        name: item,
        status: 'done',
        url: `${SERVER_FILE_PREFIX.IMG}/${item}`
      })),
      category: {
        value: category.id,
        label: category.title
      },
      ...rest
    }
  }, [isLoading, data])
  const { onClose } = rest
  const handleFinish = async (values: CommodityForm) => {
    const { category, imgNames, ...rest } = values
    const { flag } = await triggerUpdate({
      ...rest,
      imgNames: imgNames?.map((item) => item.name) || [],
      category: category?.value
    })
    if (flag === 1) {
      message.success('更新成功')
      onSubmit?.()
    }
  }
  const handleDrawerClose = (e: any) => {
    onClose?.(e)
  }
  const handleDrawerSubmit = () => formRef.current?.submit()
  const renderAction = () => (
    <Space>
      <Button onClick={handleDrawerClose}>取消</Button>
      <Button onClick={handleDrawerSubmit} type="primary">
        保存并更新
      </Button>
    </Space>
  )
  return (
    <Drawer extra={renderAction()} title="编辑" width={650} {...rest}>
      <div className="max-w-xl mt-5">
        {isLoading === false && (
          <Form ref={formRef} key={id} initialValues={initialValues} onFinish={handleFinish} showSubmitBtn={false} />
        )}
      </div>
    </Drawer>
  )
}

export default memo(EditDrawer)
