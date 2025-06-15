import { useState, useEffect } from 'react'
import { sse } from '@/common/utils/ajax'
import { Message } from '@/common/types/message'

// export interface MessageEvent<DATA = Message> {
//   id?: string
//   data: DATA
//   type?: string
//   retry?: number
// }

export default function useSSE() {
  const [data, setData] = useState<Message>()
  useEffect(() => {
    const worker = sse()
    const handleMessage = (event: MessageEvent) => {
      const data: { data: Message } = JSON.parse(event.data as string)
      if (data !== undefined) {
        setData(data.data)
      }
    }
    worker.port.addEventListener('message', handleMessage)
    return () => worker.port.removeEventListener('message', handleMessage)
  })
  return [data]
}
