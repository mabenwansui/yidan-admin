import { useState, useEffect } from 'react'
import { sse } from '@/common/utils/ajax'
import { App } from 'antd'

export enum MessageType {
  SYSTEM_MESSAGE = 'system'
}

interface SystemData {
  title: string
  message: string
}

interface AjaxResponse {
  type: MessageType
  data: SystemData
}

export default function useSSE() {
  const [data, setData] = useState<AjaxResponse>()
  const { notification } = App.useApp()
  useEffect(() => {
    const worker = sse()
    worker.port.addEventListener('message', (event) => {
      const data: AjaxResponse = JSON.parse(event.data as string)
      if (data !== undefined) {
        if (data.type === MessageType.SYSTEM_MESSAGE) {
          notification.open({
            message: data?.data?.title || '系统消息',
            description: data.data.message
          })
        }
        setData(data)
      }
    })
  }, [notification])
  return { data }
}
