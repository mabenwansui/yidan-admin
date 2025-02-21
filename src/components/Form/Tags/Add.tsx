import { useState, useRef, useEffect } from 'react'
import { Input, Tag, InputRef } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Props {
  onFinish?: (val: string) => void
}
export default function Add(props: Props) {
  const [inputValue, setInputValue] = useState<string>()
  const [inputVisible, setInputVisible] = useState(false)
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue) {
      props?.onFinish?.(inputValue)
    }
    setInputVisible(false)
    setInputValue('')
  }
  return (
    <>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="w-20"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={() => setInputVisible(true)}>
          <PlusOutlined /> 新增
        </Tag>
      )}
    </>
  )
}
