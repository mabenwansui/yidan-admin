import { useState, memo } from 'react'
import EditorModal from './EditorModal'

interface Props {
  title: string
  value?: string
  buttonText?: string
  onOk?: (html: string, close: () => void) => void
}

export function EditorButton(props: Props) {
  const { value = '', title, buttonText = '点击编辑', onOk } = props
  const [open, setOpen] = useState(false)

  const handleOk = (event: any, html: string) => {
    onOk?.(html, () => setOpen(false))
  }
  const handleCancel = () => setOpen(false)
  const handleClick = () => setOpen(true)
  return (
    <>
      <a onClick={handleClick}>{buttonText}</a>
      {<EditorModal width={980} title={title} value={value} onOk={handleOk} open={open} onCancel={handleCancel} />}
    </>
  )
}
export default memo(EditorButton)
