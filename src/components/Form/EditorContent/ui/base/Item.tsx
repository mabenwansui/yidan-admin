import { Tooltip } from 'antd'
import Icon from '@/components/Icons'
import cs from 'clsx'

interface Props {
  title?: string
  /** 仅针对图标 */
  iconName: string
  isActive?: boolean
  onClick?: () => void
}

export default function Item(props: Props) {
  const { title, isActive, iconName, onClick = () => {}, ...rest } = props
  const content = (
    <div className={cs('bubble-menu-btn', isActive ? 'active' : '')} onClick={onClick} {...rest}>
      <Icon name={iconName} />
    </div>
  )
  return title ? (
    <Tooltip title={title} mouseEnterDelay={0.3}>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
