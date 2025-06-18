import { Message, MessageType, Content_Order } from '@/common/types/message'
import Wrap from './Wrap'
import Order from './Order'
import useStore from '../../store/index'
import useDelete from '../../hooks/useDelete'
import useRead from '../../hooks/useRead'

interface Props {
  message: Message
}

export default function Card(props: Props) {
  const { message } = props
  const read = useStore((state) => state.read)
  const deleteList = useStore((state) => state.deleteList)
  const { trigger: delTrigger } = useDelete()
  const { trigger: readTrigger } = useRead()
  const { isRead, id, content } = message
  const handleRead = async () => {
    const { flag } = await readTrigger({ id })
    if (flag === 1) {
      read(id)
    }
  }
  const handleDelete = async () => {
    const { flag } = await delTrigger({ id })
    if (flag === 1) {
      deleteList(id)
    }
  }
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
