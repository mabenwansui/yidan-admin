import { useEffect, useRef } from 'react'
import { Input, InputProps, InputRef, Button } from 'antd'

interface Props {
  value: string
  onChange: (val: string) => void
  onCancel?: () => void
  onSubmit: () => void
}

export default function LinkFormItem(props: Props) {
  const { value, onChange, onCancel, onSubmit } = props
  const inputRef = useRef<InputRef>(null)
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 10)
  }, [])
  const handleChange: InputProps['onChange'] = (e) => {
    onChange(e.target.value)
  }
  const handleSubmit: InputProps['onClick'] = () => {
    onSubmit?.()
  }
  const handleCancel = () => {
    onCancel?.()
  }
  return (
    <div className="p-3">
      <div className="w-75!">
        <Input
          value={value}
          ref={inputRef}
          placeholder="输入链接地址"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e as any)
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Button size="small" onClick={handleSubmit} type="primary">
          确认
        </Button>
        <Button size="small" onClick={handleCancel} className="ml-2">
          取消
        </Button>
      </div>
    </div>
  )
}
