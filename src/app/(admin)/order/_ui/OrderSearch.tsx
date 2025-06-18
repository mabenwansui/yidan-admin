import { memo } from 'react'
import { Space, Form, FormProps } from 'antd'
import { TreeSelect } from '@/components/Form/CommodityCategory'
import { CreateBtn } from '@/components/Button'
import SelectCommodity from '@/components/Form/SelectCommodity'

export interface Values {
  category: {
    label: string
    value: string
  }
  isOnShelf: boolean | 'all'
}

interface Props extends FormProps {
  onCreate: () => void
}

function BranchSearch(props: Props) {
  const { onCreate, ...formProps } = props
  return (
    <div className="mb-4 flex justify-between items-center">
      <Form {...formProps}>
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
      <div>
        <CreateBtn onClick={onCreate}>创建商品</CreateBtn>
      </div>
    </div>
  )
}
export default memo(BranchSearch)
