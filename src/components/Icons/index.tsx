import { useMemo, memo } from 'react'
import logger from '@/common/utils/logger'
import cs from 'clsx'
import { CirclePlus, Trash2, Pencil, Bold, Italic, Strikethrough, Palette, Link, Unlink } from 'lucide-react'

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  color?: string
  className?: string
  size?: 'middle' | 'large' | 'small'
}

const sizeMapping = {
  small: '12',
  middle: '16',
  large: '20'
}

/* 图标预览 https://lucide.dev/icons */
function Icon(props: IconProps) {
  const { name, size = 'middle', color, className, ...rest } = props
  const _size = sizeMapping[size]
  const _props = useMemo(() => ({ size: _size, color, strokeWidth: '2.5' }), [_size, color])
  const renderIcon = (Node: any) => {
    return (
      <span className={cs('icon', 'inline-block', className)} {...rest}>
        <Node {..._props} />
      </span>
    )
  }
  switch (name) {
    // 新增
    case 'add':
      return renderIcon(CirclePlus)
    // 删除（垃圾桶）
    case 'delete':
      return renderIcon(Trash2)
    // 编辑
    case 'edit':
      return renderIcon(Pencil)
    case 'bold':
      return renderIcon(Bold)
    case 'italic':
      return renderIcon(Italic)
    case 'strikethrough':
      return renderIcon(Strikethrough)
    case 'palette':
      return renderIcon(Palette)
    case 'link':
      return renderIcon(Link)
    case 'unlink':
      return renderIcon(Unlink)
    default:
      logger.error('图标未找到!')
  }
}
export default memo(Icon)
