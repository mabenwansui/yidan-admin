/**
 * 避免用户输入过程中就报错
 * 初次验证在失去焦点后，而后在内容改变时
 */

import { useMemo, useRef, memo } from 'react'
import { Form, FormItemProps, Input } from 'antd'

const reg = /^1[3-9]\d{9}$/

interface PhoneItemProps extends Omit<FormItemProps, 'children'> {
  placeholder?: string
}

const enum Event {
  blur = 'blur',
  change = 'change'
}

const errorMsg = '请输入正确的手机号'

function Phone(props: PhoneItemProps) {
  const { placeholder, name, ...rest } = props
  const eventRef = useRef<Event | ''>('')
  const isError = useRef(false)
  const rules = useMemo(() => {
    return [
      ...(props.rules || []),
      {
        validator: async (_: any, value: any) => {
          if (value === '' || reg.test(value)) {
            isError.current = false
            return Promise.resolve()
          } else {
            if (eventRef.current === Event.blur) {
              isError.current = true
              return Promise.reject(new Error(errorMsg))
            } else if (isError.current === true) {
              return Promise.reject(new Error(errorMsg))
            }
          }
        }
      }
    ]
  }, [props.rules])

  const handleChange = () => (eventRef.current = Event.change)
  const handleBlur = () => (eventRef.current = Event.blur)
  return (
    <Form.Item name={name} {...rest} rules={rules} validateTrigger={['onBlur', 'onChange']}>
      <Input placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} />
    </Form.Item>
  )
}

export default memo(Phone)
