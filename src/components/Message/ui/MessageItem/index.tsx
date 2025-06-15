import { Message, MessageType, Content_Order } from '@/common/types/message'
import Wrap from './Wrap'
import Order from './Order'
interface Props {
  message: Message
  onRead: (id: string) => void
}

export default function Card(props: Props) {
  const { message, onRead } = props
  const { isRead, id, content } = message
  switch (message.messageType) {
    case MessageType.ORDER:
      return (
        <Wrap id={id} title="系统订单" read={isRead} onRead={onRead}>
          <Order orderId={(content as Content_Order).orderId} />
        </Wrap>
      )
    default:
      return null
  }
}
