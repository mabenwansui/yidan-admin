import logger from '@/common/utils/logger'
import { CirclePlus, Trash2, Pencil, Bold, Italic, Strikethrough, Palette, Link } from 'lucide-react'

interface IconProps {
  name: string
  color?: string
  size?: 'middle' | 'large' | 'small'
}

const sizeMapping = {
  small: '12',
  middle: '16',
  large: '20'
}

/* 图标预览 https://lucide.dev/icons/circle-plus */
export default function Icon(props: IconProps) {
  const { name, size = 'middle', color } = props
  const _size = sizeMapping[size]
  const _props = { size: _size, color, strokeWidth: '2.5' }
  switch (name) {
    // 新增
    case 'circle-plus':
      return <CirclePlus {..._props} />
    // 删除（垃圾桶）
    case 'trash-2':
      return <Trash2 {..._props} />
    // 编辑
    case 'pencil':
      return <Pencil {..._props} />
    case 'bold':
      return <Bold {..._props} />
    case 'italic':
      return <Italic {..._props} />
    case 'strikethrough':
      return <Strikethrough {..._props} />
    case 'palette':
      return <Palette {..._props} />
    case 'link':
      return <Link {..._props} />
    default:
      logger.error('图标未找到!')
  }
}
