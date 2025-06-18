import { useState } from 'react'
import { Badge } from 'antd'
import Icon from '@/components/Icons'
import useStore from './store/index'
import useInitStore from './store/useInitStore'
import Notification from './ui/Notification'
import MessageList from './ui/MessageList'

export default function Message() {
  const [open, setOpen] = useState(false)
  useInitStore(open)
  const unReadTotal = useStore((state) => state.unReadTotal)
  const handleTriggerOpen = (open: boolean) => setOpen(open)
  return (
    <>
      <Notification />
      <MessageList open={open} onClose={() => handleTriggerOpen(false)} />
      <div
        onClick={() => handleTriggerOpen(true)}
        className="cursor-pointer hover:bg-gray-100 p-2 pt-1.5 pb-0 rounded-md"
      >
        <Badge size="small" className="[&_.ant-badge-count]:pl-1! [&_.ant-badge-count]:pr-1!" count={unReadTotal}>
          <Icon size="large" name="message-square-more" />
        </Badge>
      </div>
    </>
  )
}
