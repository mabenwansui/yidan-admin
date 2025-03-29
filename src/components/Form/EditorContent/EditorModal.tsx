import React, { useRef, memo } from 'react'
import { Modal, ModalProps } from 'antd'
import EditorContent, { RefMethods } from './EditorContent'

interface Props extends Omit<ModalProps, 'onOk'> {
  onOk?: (e: React.MouseEvent<HTMLButtonElement>, html: string) => void
  value: string
}

function EditorModal(props: Props) {
  const { value, onOk, ...rest } = props
  const editorRef = useRef<RefMethods>(null)

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOk?.(e, editorRef?.current?.getHtml() || '')
  }

  return (
    <>
      <Modal okText="保存" onOk={handleOk} {...rest}>
        <EditorContent className="mt-4 mb-4 h-140" value={value} ref={editorRef} />
      </Modal>
    </>
  )
}

export default memo(EditorModal)
