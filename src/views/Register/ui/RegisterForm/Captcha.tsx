'use client'
import { useState, useEffect } from 'react'
import { useSWR } from '@/common/hooks/useAjax'
import { getCaptchaApi, getCaptchaApiUrl } from './api'
import { Form, Input } from 'antd'

export default function Captcha() {
  const [captchaIndex, setCaptchaIndex] = useState(Date.now())
  const from = Form.useFormInstance()
  const { data, isLoading } = useSWR(`${getCaptchaApiUrl}?index=${captchaIndex}`, getCaptchaApi, {
    revalidateOnFocus: false,
    refreshInterval: 120 * 1e3
  })
  useEffect(() => {
    from.setFieldValue('captchaKey', data?.data?.key)
  }, [data?.data?.key, from])
  const onCaptchaClick = () => {
    setCaptchaIndex(Date.now())
  }
  return (
    <>
      <Form.Item name="captchaKey" hidden>
        <Input />
      </Form.Item>
      {!isLoading && data?.data?.data && (
        <div
          onClick={onCaptchaClick}
          className="*:w-28 *:h-9 absolute -top-1 hover:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: data.data.data }}
        />
      )}
    </>
  )
}
