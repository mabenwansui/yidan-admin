import { Button, ButtonProps } from 'antd'

export default function CreateBtn(props: ButtonProps) {
  return <Button className="pl-6! pr-6!" type="primary" size="large" {...props} />
}
