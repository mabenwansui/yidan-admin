import { Drawer, DrawerProps, Button, Badge } from 'antd'
import { EyeOutlined, ClearOutlined } from '@ant-design/icons'
import useStore from '../../store/index'
import MessageList from './index'

interface Props extends Omit<DrawerProps, 'open'> {
  open: boolean
}

export default function CustomDrawer(props: Props) {
  const unReadTotal = useStore((state) => state.unReadTotal)
  const renderExtra = () => {
    return (
      <>
        <Button icon={<ClearOutlined />} className="mr-2">
          清空已读
        </Button>
        <Button icon={<EyeOutlined />}>全部设置为已读</Button>
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
