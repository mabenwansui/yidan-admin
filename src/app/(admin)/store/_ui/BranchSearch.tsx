import { memo } from 'react'
import { Space, Select, Form, FormProps } from 'antd'
import { TreeSelect } from '@/components/Form/CommodityCategory'
import { OnShelfStatus } from '@/common/constants/fields'

const options = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: OnShelfStatus.On,
    value: true
  },
  {
    label: OnShelfStatus.Off,
    value: false
  }
]

export interface Values {
  category: {
    label: string
    value: string
  }
  isOnShelf: boolean | 'all'
}

function BranchSearch(props: FormProps) {
  return (
    <div className="mb-6">
      <Form {...props}>
        <Space>
          <span>筛选: </span>
          <Form.Item name="category" noStyle>
            <TreeSelect placeholder="商品分类" className="w-50!" />
          </Form.Item>
          <Form.Item name="isOnShelf" noStyle>
            <Select placeholder="上架状态" className="w-30" options={options} allowClear></Select>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}
export default memo(BranchSearch)
