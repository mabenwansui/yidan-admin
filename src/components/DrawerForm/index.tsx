import { memo } from 'react'
import { Drawer, DrawerProps, Space, Button } from 'antd'

export enum DrawerFormType {
  CREATE = 'create',
  EDIT = 'edit'
}

interface Props extends DrawerProps {
  type: DrawerFormType.CREATE | DrawerFormType.EDIT
  onSubmit?: () => void
}

const titleMapping = {
  [DrawerFormType.CREATE]: '创建',
  [DrawerFormType.EDIT]: '编辑'
}

const submitMapping = {
  [DrawerFormType.CREATE]: '创建',
  [DrawerFormType.EDIT]: '保存并更新'
}

function FormDrawer(props: Props) {
  const { children, type, onSubmit, ...rest } = props
  const handleDrawerSubmit = () => onSubmit?.()
  const renderAction = () => (
    <Space>
      <Button onClick={props.onClose}>取消</Button>
      <Button onClick={handleDrawerSubmit} type="primary">
        {submitMapping[type]}
      </Button>
    </Space>
  )
  return (
    <Drawer extra={renderAction()} title={titleMapping[type]} width={650} {...rest}>
      <div className="max-w-xl mt-5">{children}</div>
    </Drawer>
  )
}

export default memo(FormDrawer)
