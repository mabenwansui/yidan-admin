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

  const { onFinish } = props

  useEffect(() => {
    if (inputVisible) inputRef.current?.focus()
  }, [inputVisible])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue) onFinish?.(inputValue)
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
          className="w-24! h-5.5!"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag className="border-dashed! cursor-pointer" onClick={() => setInputVisible(true)}>
          <PlusOutlined /> 新增
        </Tag>
      )}
    </>
  )
}
