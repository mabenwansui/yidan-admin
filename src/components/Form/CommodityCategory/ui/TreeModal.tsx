'use client'
import { useState } from 'react'
import { Modal, Button } from 'antd'
import Tree, { Props as TreeProps } from './Tree'

interface Props extends TreeProps {
  open: boolean
  onClose?: (isChange: boolean) => void
}

export default function TreeModal(props: Props) {
  const [isChange, setIsChange] = useState(false)
  const { open, onClose, ...rest } = props
  const handleCancel = () => {
    onClose?.(isChange)
  }
  const handleChange = () => {
    setIsChange(true)
  }
  return (
    <Modal
      title="分类管理"
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>
      ]}
      open={open}
      onCancel={handleCancel}
    >
      <Tree onChange={handleChange} {...rest} />
    </Modal>
  )
}
