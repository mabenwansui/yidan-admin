import { Button, Result } from 'antd'
export default function CommoditySuccessPage() {
  return (
    <div className="bg-white border border-neutral-100 w-3xl m-auto mt-10">
      <Result
        status="success"
        title="创建成功!"
        extra={[
          <Button type="primary" key="primary" className="!me-3">
            继续创建
          </Button>,
          <Button key="cancel">返回列表查看</Button>
        ]}
      />
    </div>
  )
}
