'use client'
import { Badge, Steps } from 'antd'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { Commodity, ORDER_STATUS, ORDER_STATUS_MAPPING, ORDER_TYPE_MAPPING } from '@/common/types/order'
import Image from '@/components/Image'
import DetailsLayout from '@/components/Layout/DetailsLayout'
import OrderOperateBtn from '../_ui/OrderOperateBtn'
import useGetOrderInfo from '../_hooks/useGetOrderInfo'

export default function OrderDetails() {
  const params = useParams()
  const { data } = useGetOrderInfo({ orderId: Array.isArray(params) ? params[0] : params.id })
  const orderStatus = data?.orderStatus && ORDER_STATUS_MAPPING[data.orderStatus]
  const orderType = data?.orderType && ORDER_TYPE_MAPPING[data.orderType]
  const renderImage = (item: Commodity) => (
    <Image src={item.branch.commodity?.coverImageUrl} alt={item.branch.commodity?.name} />
  )
  const payAt = data?.payAt && dayjs(data.payAt).format('YY-MM-DD HH:mm')
  const acceptedAt = data?.acceptedAt && dayjs(data.acceptedAt).format('YY-MM-DD HH:mm')
  const completedAt = data?.completedAt && dayjs(data.completedAt).format('YY-MM-DD HH:mm')
  const stepsItems = [
    {
      key: ORDER_STATUS.PAID,
      title: ORDER_STATUS_MAPPING[ORDER_STATUS.PAID],
      description: payAt
    },
    {
      key: ORDER_STATUS.PROCESSING,
      title: ORDER_STATUS_MAPPING[ORDER_STATUS.PROCESSING],
      description: acceptedAt
    },
    {
      key: ORDER_STATUS.COMPLETED,
      title: ORDER_STATUS_MAPPING[ORDER_STATUS.COMPLETED],
      description: completedAt
    }
  ]
  const curStep = stepsItems.findIndex((item) => item.key === data?.orderStatus)
  const handleUpdateStage = (orderId: string, orderStatus: ORDER_STATUS) => {
    console.log('xx:::', orderId, orderStatus)
  }
  return (
    <DetailsLayout>
      <section className="mb-12 p-12 bg-white border border-border rounded-lg shadow-md">
        <Steps current={curStep} items={stepsItems} />
        {data?.orderStatus !== ORDER_STATUS.ARCHIVED && (
          <section className="text-center mt-8">
            <OrderOperateBtn
              className="w-28!"
              buttonType={{ size: 'large' }}
              order={data}
              onUpdateStage={handleUpdateStage}
            />
          </section>
        )}
      </section>
      <section className="flex flex-wrap **:[dl]:w-1/2 **:[dl]:flex **:[dl]:mb-2 **:[dt]:w-24 **:[dt]:text-right **:[dt]:pr-4">
        <dl className="w-full! mb-6!">
          <dt>商品</dt>
          <dd>
            <ul className="flex flex-wrap -ml-3 -mt-1">
              {data?.commoditys.map((item: Commodity) => {
                const { id, commodity } = item.branch
                const { quantity } = item
                const Img = renderImage(item)
                return (
                  <li className="mr-1 w-24 text-center" key={id}>
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
          </dd>
        </dl>
        <dl>
          <dt>订单号</dt>
          <dd>{data?.orderId}</dd>
        </dl>
        <dl>
          <dt>订单类型</dt>
          <dd>{orderType}</dd>
        </dl>
        <dl>
          <dt>订单状态</dt>
          <dd>{orderStatus}</dd>
        </dl>
        <dl>
          <dt>金额</dt>
          <dd>{data?.actualAmount}</dd>
        </dl>
        <dl>
          <dt>支付类型</dt>
          <dd>{data?.paymentType}</dd>
        </dl>
        <dl>
          <dt>支付状态</dt>
          <dd>{data?.paymentStatus}</dd>
        </dl>
        <dl>
          <dt>桌号</dt>
          <dd>{data?.tableNumber}</dd>
        </dl>
        <dl>
          <dt>备注</dt>
          <dd>{data?.remark}</dd>
        </dl>
      </section>
    </DetailsLayout>
  )
}
