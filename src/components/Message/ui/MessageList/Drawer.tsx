import { Drawer, DrawerProps, Button, Badge } from 'antd'
import { EyeOutlined, ClearOutlined } from '@ant-design/icons'
import useStore from '../../store/index'
import useRead from '../../hooks/useRead'
import useDelete from '../../hooks/useDelete'
import MessageList from './list'

interface Props extends Omit<DrawerProps, 'open'> {
  open: boolean
}

export default function CustomDrawer(props: Props) {
  const unReadTotal = useStore((state) => state.unReadTotal)
  const read = useStore((state) => state.read)
  const deleteList = useStore((state) => state.deleteList)
  const { trigger: readTrigger } = useRead()
  const { trigger: delTrigger } = useDelete()
  const handleRead = async () => {
    const { flag } = await readTrigger({})
    if (flag === 1) read()
  }
  const handleClear = async () => {
    const { flag } = await delTrigger({})
    if (flag === 1) deleteList()
  }
  const renderExtra = () => {
    return (
      <>
        <Button onClick={handleClear} icon={<ClearOutlined />} className="mr-2">
          清空已读
        </Button>
        <Button onClick={handleRead} icon={<EyeOutlined />}>
          全部设置为已读
        </Button>
      </>
    )
  }
  return (
    <Drawer
      width={534}
      title={
        <div className="flex items-center">
          消息中心 <Badge count={unReadTotal} className="ml-1! -mt-px!" />
        </div>
      }
      {...props}
      extra={renderExtra()}
    >
      <MessageList />
    </Drawer>
  )
}
