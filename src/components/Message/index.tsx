import { useState, useEffect } from 'react'
import { Badge } from 'antd'
import useSSE from '@/common/hooks/useAjax/useSSE'
import Icon from '@/components/Icons'
import useUnRead from './hooks/useUnRead'
import useSetRead from './hooks/useSetRead'
import { useSystemList } from './hooks/useList'
import Notification from './ui/Notification'
import MessageListDrawer from './ui/MessageList/Drawer'

export default function Message() {
  const [openMessageList, setOpenMessageList] = useState(true)
  const [message] = useSSE()
  const { data: unRead, mutate: mutateUnRead } = useUnRead()
  const { trigger: setReadTrigger } = useSetRead()
  useEffect(() => {
    if (message) mutateUnRead()
  }, [message, mutateUnRead])
  const handleClick = async () => {
    setOpenMessageList(true)
  }
  const handleClose = () => {
    setOpenMessageList(false)
  }
  const handleOnRead = async (messageId: string) => {
    const { flag } = await setReadTrigger({ id: messageId })
    if (flag === 1) {}
  }
  return (
    <>
      <Notification message={message} />
      <MessageListDrawer open={openMessageList} onRead={handleOnRead} onClose={handleClose} />
      <div onClick={handleClick} className="cursor-pointer hover:bg-gray-100 p-2 pt-1.5 pb-0 rounded-md">
        <Badge
          size="small"
          className="[&_.ant-badge-count]:pl-1! [&_.ant-badge-count]:pr-1!"
          count={unRead?.data.total}
        >
          <Icon size="large" name="message-square-more" />
        </Badge>
      </div>
    </>
  )
}
