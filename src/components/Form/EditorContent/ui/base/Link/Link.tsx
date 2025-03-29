import { useState } from 'react'
import { Popover, PopoverProps } from 'antd'
import Item from '../Item'
import LinkFormItem from './LinkFormItem'
import useEditorStore from '../../../store'

export default function Link() {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('')
  const commands = useEditorStore((state) => state.commands)
  const handleSubmit = () => {
    commands().onLink(val)
    setVal('')
    setOpen(false)
    commands().focusEnd()
  }
  const handleOpenChange: PopoverProps['onOpenChange'] = (open) => {
    setOpen(open)
    if (!open) {
      // commands().focus()
    }
  }
  const handleChange = (val: string) => setVal(val)
  return (
    <Popover
      open={open}
      trigger="click"
      onOpenChange={handleOpenChange}
      content={<LinkFormItem value={val} onChange={handleChange} onSubmit={handleSubmit} />}
    >
      <span>
        <Item iconName="link" />
      </span>
    </Popover>
  )
}
