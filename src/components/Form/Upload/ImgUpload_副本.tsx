'use client'
import { useState, useRef, useMemo, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Upload as AntUpload, UploadProps as AntUploadProps, GetProp, App, UploadFile, Image } from 'antd'
import { apiPrefix } from '@/common/utils/ajax'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'

type FileType = Parameters<GetProp<AntUploadProps, 'beforeUpload'>>[0]

interface ResponseData {
  flag: 1 | 0
  data: {
    name: string
    url: string
  }
}
export interface UploadProps extends Omit<AntUploadProps<ResponseData>, 'onChange'> {
  value?: string[]
  checkTypes?: string[]
  /* 单位: KB, default:5M */
  maxImageSize?: number
  onChange?: (props: string[]) => void
}

function useInitialValues(values: string[] | undefined): UploadFile[] {
  return useMemo(() => {
    if (!values) {
      return []
    } else {
      return values.map((item: string) => {
        const url = `${SERVER_FILE_PREFIX.IMG}/${item}`
        return {
          uid: item,
          name: item,
          url,
          thumbUrl: url,
          status: 'done'
        }
      })
    }
  }, [values])
}

export default function Upload(props: UploadProps) {
  const { message } = App.useApp()
  const initialValues = useInitialValues(props.value)
  const [fileList, setFileList] = useState<UploadFile[]>(initialValues)
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const defaultProps: UploadProps = {
    name: 'img',
    listType: 'picture-card',
    withCredentials: true,
    checkTypes: ['image/jpeg', 'image/png', 'image/gif'],
    accept: '.png,.jpg,.jpeg,.gif',
    maxCount: 30,
    maxImageSize: 1024 * 1024 * 5, // 5M(单位bye)
    multiple: true
  }
  const _props = { ...defaultProps, ...props }
  const { checkTypes, maxImageSize, onChange, ...rest } = _props

  const beforeUpload = (file: FileType) => {
    const { LIST_IGNORE } = AntUpload
    const isAccept = (checkTypes as Array<string>).includes(file.type)
    if (!isAccept) {
      message.error(`只能上传jpg、png格式的图片`)
      return LIST_IGNORE
    }
    if (file.size > maxImageSize!) {
      const curSize = (file.size / 1024 / 1024).toFixed(2)
      const maxSize = parseFloat((maxImageSize! / 1024 / 1024).toFixed(2))
      message.error(`图片尺寸超出限制, 当前大小为${curSize}M, 不能超过${maxSize}M`)
      return LIST_IGNORE
    }
    return true
  }
  const handleChange: AntUploadProps<ResponseData>['onChange'] = ({ fileList }) => {
    const doneArr: UploadFile[] = []
    const list = fileList.map((item) => {
      const { response, status } = item
      if (status === 'done') {
        if (response?.data) {
          const { name, url } = response.data
          item.name = name
          item.url = url
        }
        doneArr.push(item)
      }
      return item
    })
    setFileList(list)
    if (doneArr.length > 0) {
      onChange?.(doneArr.map((item) => item.name))
    }
  }
  const handlePreview = (file: UploadFile<ResponseData>) => {
    const { url, thumbUrl } = file
    setPreviewImage(url || thumbUrl!)
    setPreviewOpen(true)
  }
  return (
    <div className="[&_.ant-upload-list-item-container]:bg-white">
      <AntUpload
        action={`${apiPrefix}/api/file/upload/img`}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        {...rest}
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
