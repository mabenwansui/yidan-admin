'use client'
import { Button, Row, Col } from 'antd'
import CommodityNav from './ui/CommodityNav'
import CommodityTableList from './ui/CommodityTableList'

export default function Commodity() {
  return (
    <section className="flex justify-between">
      <div className="w-34">
        <CommodityNav />
      </div>
      <div className="flex-auto ml-6">
        <div>
          <div>
            <Row gutter={16}>
              <Col span={8}>店铺名称</Col>
            </Row>
          </div>
          <Button type="primary" size="large">
            上架商品
          </Button>
        </div>
        <CommodityTableList list={[]} isLoading={false} curPage={1} pageSize={30} total={100} isFirstLoad={false} />
      </div>
    </section>
  )
}
