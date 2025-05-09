import { useState } from 'react'
import { Drawer } from 'antd'
import Info from './Info'

export default function MessageList() {
  const [open, setOpen] = useState(true)
  return (
    <Drawer>
      <div className="">
        <ul>
          <li>通知一</li>
          <li>通知二</li>
          <li>通知三</li>
          <li>通知四</li>
        </ul>
        <Drawer open={open}>
          <Info />
        </Drawer>
      </div>
    </Drawer>
  )
}
