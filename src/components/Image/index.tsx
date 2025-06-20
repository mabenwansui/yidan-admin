import NextImage from 'next/image'
import imgCommdityPlaceholder from '@/common/images/commodity_placeholder.svg'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'
import { Image as AntdImage } from 'antd'

interface Props {
  src?: string
  size?: 'middle' | 'large' | 'small'
  alt?: string
  priority?: boolean
}

const sizeMap = {
  middle: 68,
  large: 128,
  small: 32
}

export default function Image(props: Props) {
  const { src, priority, size = 'middle', alt = '' } = props
  const _size = sizeMap[size]
  if (src) {
    return <AntdImage src={`${SERVER_FILE_PREFIX.IMG}/${src}`} width={_size} height={_size} alt={alt} />
  } else {
    return (
      <NextImage
        priority={priority}
        src={imgCommdityPlaceholder}
        width={128}
        height={128}
        style={{ width: _size, height: _size }}
        alt={alt}
      />
    )
  }
}
