import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload as AntUpload, UploadProps as AntUploadProps, GetProp, App } from 'antd'
import Image from 'next/image'

type FileType = Parameters<GetProp<AntUploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export interface UploadProps {
  /* 发到后台的文件参数名 */
  name: string
  /* default: ['image/jpeg', 'image/jpg', 'image/png'] */
  accept?: Array<'image/jpeg' | 'image/jpg' | 'image/png'>
  size?: 'middle' | 'large' | 'small'
  /* 单位: KB */
  maxImageSize?: number
  onChange?: () => void
}
export default function Upload(props: UploadProps) {
  const { message } = App.useApp()
  const defaultProps: UploadProps = {
    name: 'file',
    accept: ['image/jpeg', 'image/jpg', 'image/png'],
    size: 'middle',
    maxImageSize: 1024 * 2,
    onChange: () => {},
  }
  const _props = { ...defaultProps, ...props } as Required<UploadProps>

  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const beforeUpload = (file: FileType) => {
    const { accept, maxImageSize } = _props
    const isAccept = (accept as Array<string>).includes(file.type)
    if (!isAccept) {
      message.error(`只能上传jpg、png格式的图片`)
      return false
    }
    if (file.size < maxImageSize) {
      message.error(`图片尺寸超出限制, 当前大小为${file.size}, 不能超过${maxImageSize}`)
      return false
    }
    return true
  }

  const handleChange: AntUploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
      _props.onChange()
    }
  }
  return (
    <AntUpload
      name="avatar"
      listType="picture-card"
      className="w-24"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="图片上传" style={{ width: '100%' }} />
      ) : (
        <div className="inline-block">{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
      )}
    </AntUpload>
  )
}
