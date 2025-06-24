import { memo } from 'react'
import { Space, Form, FormProps, Select } from 'antd'
import { ORDER_STATUS, ORDER_STATUS_MAPPING, ORDER_TYPE, ORDER_TYPE_MAPPING } from '@/common/types/order'

export interface Values {
  orderStatus: ORDER_STATUS
  orderType: ORDER_TYPE
}

type Props = FormProps

const orderStatusOptions = [
  {
    label: '全部',
    value: ''
  },
  ...[ORDER_STATUS.PAID, ORDER_STATUS.PROCESSING, ORDER_STATUS.READY, ORDER_STATUS.COMPLETED].map((item) => ({
    label: ORDER_STATUS_MAPPING[item],
    value: item
  }))
]

const orderTypeOptions = [
  {
    label: '全部',
    value: ''
  },
  ...[ORDER_TYPE.DINE_IN, ORDER_TYPE.TAKE_OUT, ORDER_TYPE.DELIVERY].map((item) => ({
    label: ORDER_TYPE_MAPPING[item],
    value: item
  }))
]

function OrderSearch(props: Props) {
  const { ...formProps } = props
  return (
    <div className="mb-6 flex justify-between items-center">
      <Form<Values> {...formProps}>
        <Space>
          <span>筛选: </span>
          <Form.Item name="orderStatus" noStyle>
            <Select placeholder="订单状态" allowClear={true} className="w-50!" options={orderStatusOptions} />
          </Form.Item>
          <Form.Item name="orderType" noStyle>
            <Select placeholder="配送方式" allowClear={true} className="w-60!" options={orderTypeOptions} />
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}
export default memo(OrderSearch)
