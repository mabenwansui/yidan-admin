import NextImage from 'next/image'
import imgCommdityPlaceholder from '@/common/images/commodity_placeholder.svg'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'
import { Image as AntdImage } from 'antd'

interface Props {
  imgUrl?: string
  size?: 'middle' | 'large' | 'small'
  alt?: string
}
export default function Image(props: Props) {
  const { imgUrl, alt = '' } = props
  if (imgUrl) {
    return <AntdImage src={`${SERVER_FILE_PREFIX.IMG}/${imgUrl}`} width={68} height={68} alt={alt} />
  } else {
    return (
      <NextImage
        priority
        src={imgCommdityPlaceholder}
        width={128}
        height={128}
        style={{ width: 68, height: 68 }}
        alt={alt}
      />
    )
  }
}
