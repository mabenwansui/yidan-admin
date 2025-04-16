import { Spin } from 'antd'

export default function SuspenseFallBack() {
  return (
    <div className="ml-auto mr-auto min-h-100 flex pt-30 justify-center">
      <Spin delay={1000} />
    </div>
  )
}
