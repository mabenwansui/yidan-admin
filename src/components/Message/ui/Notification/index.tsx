import { useEffect } from 'react'
import Link from 'next/link'
import { App, NotificationArgsProps } from 'antd'
import { MessageType, Content_Order } from '@/common/types/message'
import useStore from '../../store/index'

export default function Notification() {
  const { notification } = App.useApp()
  const receiveMessage = useStore((state) => state.receiveMessage)
  useEffect(() => {
    if (!receiveMessage) return
    let option: Partial<NotificationArgsProps> = {}
    const { messageType, title, content } = receiveMessage
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
  }, [receiveMessage, notification])
  const renderOrder = (orderId: string) => <Link href={`/order/${orderId}`}>查看订单</Link>
  return null
}
