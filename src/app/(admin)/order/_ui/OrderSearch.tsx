import { memo } from 'react'
import { Space, Form, FormProps } from 'antd'
import { TreeSelect } from '@/components/Form/CommodityCategory'
import SelectCommodity from '@/components/Form/SelectCommodity'

export interface Values {
  category: {
    label: string
    value: string
  }
  isOnShelf: boolean | 'all'
}

type Props = FormProps

function OrderSearch(props: Props) {
  const { ...formProps } = props
  return (
    <div className="mb-6 flex justify-between items-center">
      <Form<Values> {...formProps}>
        <Space>
          <span>筛选: </span>
          <Form.Item name="category" noStyle>
            <TreeSelect placeholder="商品分类" className="w-50!" />
          </Form.Item>
          <Form.Item name="category2" noStyle>
            <SelectCommodity placeholder="商品名" className="w-60!" />
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}
export default memo(OrderSearch)
