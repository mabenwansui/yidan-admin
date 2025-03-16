import { useState, useEffect, useRef } from 'react'
import { Input, InputProps, InputRef, Space, Button } from 'antd'

interface Props {
  onSubmit: (val: string) => void
}

export default function LinkFormItem(props: Props) {
  const [val, setVal] = useState('')
  const inputRef = useRef<InputRef>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  const handleChange: InputProps['onChange'] = (e) => {
    setVal(e.target.value)
  }
  const handleSubmit: InputProps['onClick'] = () => {
    const _val = val
    props.onSubmit(_val)
  }
  return (
    <div>
      <Space>
        <Input
          value={val}
          ref={inputRef}
          className="w-65!"
          placeholder="输入链接"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e as any)
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        />
        <Button onClick={handleSubmit} type="primary">
          确认
        </Button>
      </Space>
    </div>
  )
}
