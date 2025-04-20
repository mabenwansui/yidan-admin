import { memo } from 'react'
import { EditorButton } from '@/components/Form/EditorContent'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

function Details(props: Props) {
  const { value, onChange } = props
  const handleEditorOk = (html: string, close: () => void) => {
    onChange?.(html)
    close()
  }
  return <EditorButton title="商品详情编辑" value={value} onOk={handleEditorOk} />
}
export default memo(Details)
