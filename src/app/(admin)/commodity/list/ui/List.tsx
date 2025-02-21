'use client'
import { useState } from 'react'
import { Table, TableProps, Space, Image, Button } from 'antd'
import { Commodity } from '@/common/interface/commodity'
import { useSWR } from '@/common/hooks/useAjax'
import { commoditySearchApiUrl, commoditySearchApi, CommoditySearchApiProps } from '../api'
import { useRouter } from 'next/navigation'

export default function List() {
  const [x, setX] = useState('饮料')
  const { data, isLoading } = useSWR([commoditySearchApiUrl, x], ([url, x]) => commoditySearchApi({ search: x }))
  const router = useRouter()
  const handleEdit = (id: string) => {}
  const handleDel = (id: string) => {}
  const columns: TableProps<Commodity>['columns'] = [
    {
      title: '封面图',
      dataIndex: 'imgNames',
      render: (imgUrls: Array<string>, record) => <Image src={imgUrls[0]} width={50} height={50} alt={record.name} />
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: '原价',
      dataIndex: 'originalPrice'
    },
    {
      title: '现价',
      dataIndex: 'price'
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (_, record) => null
    },
    {
      title: '操作',
      key: 'operate',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleDel(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ]
  return (
    <section className="m-10">
      <div onClick={() => setX('出发')}>点击</div>
      <Table<Commodity> columns={columns} loading={isLoading} dataSource={data?.data?.list} />
    </section>
  )
}
