import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import cs from 'clsx'

interface Props {
  className?: string
}
export default function Loading(props: Props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [show])
  return (
    <div
      className={cs(
        'w-full flex justify-center p-20 primary opacity-0 transition delay-300 duration-1500 ease-in-out',
        show ? 'opacity-100' : '',
        props?.className
      )}
    >
      <LoadingOutlined style={{ fontSize: 24 }} />
    </div>
  )
}
