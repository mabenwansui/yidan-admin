import { Drawer, DrawerProps, Button } from 'antd'
import { EyeOutlined, ClearOutlined } from '@ant-design/icons'
import { useSystemList } from '../../hooks/useList'
import useSetRead from '../../hooks/useSetRead'
import MessageItem from '../MessageItem'

interface Props extends Omit<DrawerProps, 'open'> {
  open: boolean
  onRead: (messageId: string) => void
}

export default function CustomDrawer(props: Props) {
  const { open } = props
  const { list, mutate } = useSystemList(open)
  const { trigger: setReadTrigger } = useSetRead()
  const renderExtra = () => {
    return (
      <>
        <Button icon={<EyeOutlined />} className="mr-2">
          全部设置为已读
        </Button>
        <Button icon={<ClearOutlined />}>清空已读</Button>
      </>
    )
  }
  const handleOnRead = async (messageId: string) => {
    const { flag } = await setReadTrigger({ id: messageId })
    if (flag === 1) mutate()
  }
  return (
    <Drawer width={534} title="消息中心" {...props} extra={renderExtra()}>
      {list &&
        list.map((item) => (
          <div key={item.id}>
            <MessageItem onRead={handleOnRead} message={item} />
          </div>
        ))}
    </Drawer>
  )
}
