'use client'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Upload as AntUpload, UploadProps as AntUploadProps, GetProp, App, UploadFile, Image } from 'antd'
import { apiPrefix } from '@/common/utils/ajax'

type FileType = Parameters<GetProp<AntUploadProps, 'beforeUpload'>>[0]

export interface UploadProps {
  /* 发到后台的文件参数名 */
  name: string
  /* default: ['image/jpeg', 'image/jpg', 'image/png'] */
  accept?: Array<'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif'>
  size?: 'middle' | 'large' | 'small'
  /* 单位: KB */
  maxImageSize?: number
  onChange?: (props: string[]) => void
}
interface ResponseData {
  flag: 1 | 0
  data: {
    name: string
    url: string
  }
}
export default function Upload(props: UploadProps) {
  const { message } = App.useApp()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  const defaultProps: UploadProps = {
    name: 'file',
    accept: ['image/jpeg', 'image/png', 'image/gif'],
    size: 'large',
    // 5M(单位bye)
    maxImageSize: 1024 * 1024 * 5
  }
  const _props = { ...defaultProps, ...props } as Required<UploadProps>

  const beforeUpload = (file: FileType) => {
    const { accept, maxImageSize } = _props
    const { LIST_IGNORE } = AntUpload
    const isAccept = (accept as Array<string>).includes(file.type)
    if (!isAccept) {
      message.error(`只能上传jpg、png格式的图片`)
      return LIST_IGNORE
    }
    if (file.size > maxImageSize) {
      const curSize = (file.size / 1024 / 1024).toFixed(2)
      const maxSize = parseFloat((maxImageSize / 1024 / 1024).toFixed(2))
      message.error(`图片尺寸超出限制, 当前大小为${curSize}M, 不能超过${maxSize}M`)
      return LIST_IGNORE
    }
    return true
  }
  const handleChange: AntUploadProps<ResponseData>['onChange'] = ({ fileList }) => {
    setFileList(fileList)
    if (fileList.every((item) => item.status === 'done')) {
      _props?.onChange(fileList.map((item) => item.response!.data.name))
    }
  }
  const handlePreview = (file: UploadFile<ResponseData>) => {
    const { url } = file.response!.data
    setPreviewImage(url)
    setPreviewOpen(true)
  }
  return (
    <div className="[&_.ant-upload-list-item-container]:bg-white">
      <AntUpload
        name="img"
        listType="picture-card"
        accept=".png,.jpg,.jpeg,.gif"
        withCredentials={true}
        action={`${apiPrefix}/api/file/upload/img`}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={30}
        multiple
        onPreview={handlePreview}
      >
        <div className="inline-block">{<PlusOutlined />}</div>
      </AntUpload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
          alt="图片上传"
        />
      )}
    </div>
  )
}
