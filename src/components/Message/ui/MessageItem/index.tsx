import { Message, MessageType, Content_Order } from '@/common/types/message'
import Wrap from './Wrap'
import Order from './Order'
import useStore from '../../store/index'

interface Props {
  message: Message
}

export default function Card(props: Props) {
  const { message } = props
  const read = useStore((state) => state.read)
  const deleteList = useStore((state) => state.deleteList)
  const { isRead, id, content } = message
  const handleRead = () => read(id)
  const handleDelete = () => deleteList(id)
  switch (message.messageType) {
    case MessageType.ORDER:
      return (
        <Wrap title="系统订单" read={isRead} onDelete={handleDelete} onRead={handleRead}>
          <Order orderId={(content as Content_Order).orderId} />
        </Wrap>
      )
    default:
      return null
  }
}
