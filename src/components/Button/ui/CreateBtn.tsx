import { Button, ButtonProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function CreateBtn(props: ButtonProps) {
  return <Button icon={<PlusOutlined />} className="pl-4! pr-4!" type="primary" size="large" {...props} />
}
