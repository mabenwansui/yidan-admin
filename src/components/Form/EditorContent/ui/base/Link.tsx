import { useState } from 'react'
import { Popover, PopoverProps } from 'antd'
import Item from './Item'
import LinkFormItem from './LinkFormItem'
import useEditorStore from '../../store'

export default function Link() {
  const [open, setOpen] = useState(false)
  const editor = useEditorStore((state) => state.editor)
  const commands = useEditorStore((state) => state.commands)
  const handleSubmit = (val: string) => {
    commands().onLink(val)
    setOpen(false)
    if (editor) {
      const { selection } = editor.state
      editor.commands.focus(selection.to)
    }
  }
  const handleOpenChange: PopoverProps['onOpenChange'] = (open) => {
    setOpen(open)
    if (!open) {
      // commands().focus()
    }
  }
  return (
    <Popover
      open={open}
      trigger="click"
      onOpenChange={handleOpenChange}
      content={<LinkFormItem onSubmit={handleSubmit} />}
    >
      <span>
        <Item iconName="link" />
      </span>
    </Popover>
  )
}
