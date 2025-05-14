import { useEffect } from 'react'
import { Badge } from 'antd'
import Icon from '@/components/Icons'
import { post } from '@/common/utils/ajax'
import { useSSE } from '@/common/hooks/useAjax'

export default function Message() {
  const { data } = useSSE()

  const handleClick = async () => {
    const { flag } = await post('/api/order/test')
    if (flag === 1) {
      console.log('success')
    }
    console.log('handleClick')
  }
  return (
    <div onClick={handleClick} className="cursor-pointer hover:bg-gray-100 p-2 pt-1.5 pb-0 rounded-md">
      <Badge size="small" count={5}>
        <Icon size="large" name="message-square-more" />
      </Badge>
    </div>
  )
}
