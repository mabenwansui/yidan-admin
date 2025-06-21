import dayjs from 'dayjs'
import { Badge, Button } from 'antd'
import { WechatOutlined, AlipayCircleOutlined } from '@ant-design/icons'
import { Order, commodity, PAYMENT_TYPE, ORDER_TYPE, ORDER_TYPE_MAPPING } from '@/common/types/order'
import Table from '@/components/Table'
import Image from '@/components/Image'

interface Props {
  list?: Order[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  onView?: (id: string) => void
  onAcceptOrder?: (record: Order) => void
  onPageChange?: (curPage: number) => void
}

export default function OrderTableList(props: Props) {
  const { list, isLoading, curPage = 1, pageSize, total, onView, onPageChange, onAcceptOrder } = props
  const renderPaymentType = (paymentType: PAYMENT_TYPE) => {
    switch (paymentType) {
      case PAYMENT_TYPE.WECHAT:
        return <WechatOutlined className="text-xl text-success!" />
      case PAYMENT_TYPE.ALIPAY:
        return <AlipayCircleOutlined />
    }
  }
  const renderOperate = (_: any, record: Order) => (
    <div className="space-x-4">
      <a onClick={() => onView?.(record.id)}>查看</a>
      <Button type="primary" onClick={() => onAcceptOrder?.(record)}>
        接单
      </Button>
    </div>
  )
  const renderCommoditys = (commoditys: Order['commoditys']) => {
    const renderImage = (item: commodity) => (
      <Image src={item.branch.commodity?.coverImageUrl} alt={item.branch.commodity?.name} />
    )
    return (
      <div>
        <ul className="flex flex-wrap">
          {commoditys.map((item: commodity) => {
            const { id, commodity } = item.branch
            const { quantity } = item
            const Img = renderImage(item)
            return (
              <li className="mr-2 w-24 text-center mb-2" key={id}>
                <div className="flex justify-center">
                  {quantity > 0 ? (
                    <Badge.Ribbon text={`× ${quantity}`} color="var(--color-success)">
                      {Img}
                    </Badge.Ribbon>
                  ) : (
                    Img
                  )}
                </div>
                <div className="text-xs">{commodity?.name}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  const renderOrderType = (orderType: ORDER_TYPE, record: Order) => {
    const { tableNumber } = record
    let extension: string = ''
    if (orderType === ORDER_TYPE.DINE_IN && tableNumber) {
      extension = `桌号：${tableNumber}`
    }
    return (
      <>
        <div>{ORDER_TYPE_MAPPING[orderType]}</div>
        <div>{extension}</div>
      </>
    )
  }
  const renderPayAt = (payAt: Date) => dayjs(payAt).format('YY-MM-DD HH:mm')
  return (
    <section>
      <Table<Order>
        rowKey={(record) => record.id}
        loading={{
          delay: !list ? 0 : 200,
          spinning: isLoading
        }}
        dataSource={list}
        pagination={{ current: curPage, pageSize, total, onChange: onPageChange }}
      >
        <Table.Column title="下单商品" minWidth={240} dataIndex="commoditys" render={renderCommoditys} />
        <Table.Column title="备注" width={150} dataIndex="remark" />
        <Table.Column title="支付金额" width={100} dataIndex="actualAmount" align="center" />
        <Table.Column title="支付类型" width={100} dataIndex="paymentType" align="center" render={renderPaymentType} />
        <Table.Column title="配送方式" width={100} dataIndex="orderType" align="center" render={renderOrderType} />
        {/* <Table.Column title="桌号" width={100} dataIndex="table_number" align="center" /> */}
        <Table.Column title="支付时间" width={138} dataIndex="payAt" render={renderPayAt} />
        <Table.Column title="操作" width={140} key="operate" fixed="right" render={renderOperate} />
      </Table>
    </section>
  )
}
