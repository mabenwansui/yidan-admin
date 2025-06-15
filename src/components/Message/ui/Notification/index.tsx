import { useEffect } from 'react'
import { App, NotificationArgsProps } from 'antd'
import { MessageType, Content_Order, Message } from '@/common/types/message'
import Link from 'next/link'

interface Props {
  message?: Message
}

export default function Notification(props: Props) {
  const { notification } = App.useApp()
  const { message } = props
  useEffect(() => {
    if (!message) return
    let option: Partial<NotificationArgsProps> = {}
    const { messageType, title, content } = message
    switch (messageType) {
      case MessageType.ORDER: {
        option = {
          message: title,
          description: renderOrder((content as Content_Order).orderId)
        }
        break
      }
      default:
        break
    }
    notification?.info(option as NotificationArgsProps)
  }, [message, notification])
  const renderOrder = (orderId: string) => <Link href={`/order/${orderId}`}>查看订单</Link>
  return null
}
