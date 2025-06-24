'use client'
import { Badge, Steps } from 'antd'
import { useParams } from 'next/navigation'
import Image from '@/components/Image'
import useGetOrderInfo from '../_hooks/useGetOrderInfo'
import { Commodity, ORDER_STATUS, ORDER_STATUS_MAPPING, ORDER_TYPE_MAPPING } from '@/common/types/order'
import dayjs from 'dayjs'

export default function OrderDetails() {
  const params = useParams()
  const { data } = useGetOrderInfo({ orderId: Array.isArray(params) ? params[0] : params.id })
  const orderStatus = data?.orderStatus && ORDER_STATUS_MAPPING[data.orderStatus]
  const orderType = data?.orderType && ORDER_TYPE_MAPPING[data.orderType]
  const renderImage = (item: Commodity) => (
    <Image src={item.branch.commodity?.coverImageUrl} alt={item.branch.commodity?.name} />
  )
  const payAt = data?.payAt && dayjs(data.payAt).format('YY-MM-DD HH:mm')
  return (
    <>
      <section className="mb-10 max-w-4xl bg-white rounded-lg p-10 shadow-md">
        <Steps
          current={1}
          items={[
            {
              title: ORDER_STATUS_MAPPING[ORDER_STATUS.PAID],
              description: '用户已支付, 待接单',
              subTitle: payAt
            },
            {
              title: ORDER_STATUS_MAPPING[ORDER_STATUS.PROCESSING],
              description: '出餐',
              subTitle: 'Left 00:00:08'
            },
            {
              title: ORDER_STATUS_MAPPING[ORDER_STATUS.COMPLETED],
              description: ''
            }
          ]}
        />
      </section>
      <section className="flex flex-wrap **:[dl]:w-100 **:[dl]:flex **:[dl]:mb-2 **:[dt]:w-24 **:[dt]:text-right **:[dt]:pr-4">
        <dl className="w-full! mb-6!">
          <dt>商品</dt>
          <dd>
            <ul className="flex flex-wrap -ml-3">
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
    </>
  )
}
