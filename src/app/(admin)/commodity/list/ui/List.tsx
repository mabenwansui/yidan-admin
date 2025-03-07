'use client'
import { useState } from 'react'
import { Table, TableProps, Space, Image, Button } from 'antd'
import { Commodity } from '@/common/interface/commodity'
import { useSWR } from '@/common/hooks/useAjax'
import { commoditySearchApiUrl, commoditySearchApi } from '../api'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'

export default function List() {
  const [searchKey, setSearchKey] = useState('饮料')
  const { data, isLoading } = useSWR([commoditySearchApiUrl, searchKey], ([, searchKey]) =>
    commoditySearchApi({ search: searchKey })
  )
  const handleEdit = (id: string) => {
    console.log(id)
  }
  const handleDel = (id: string) => {
    console.log(id)
  }
  const columns: TableProps<Commodity>['columns'] = [
    {
      title: '封面图',
      dataIndex: 'imgNames',
      width: 100,
      render: (imgUrls: Array<string>, record) => (
        <Image src={`${SERVER_FILE_PREFIX.IMG}${imgUrls[0]}`} width={50} height={50} alt={record.name} />
      )
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: '原价',
      width: 90,
      dataIndex: 'originalPrice'
    },
    {
      title: '现价',
      width: 90,
      dataIndex: 'price'
    },
    {
      title: '分类',
      dataIndex: 'category'
      // render: (_, record) => null
    },
    {
      title: '操作',
      width: 150,
      key: 'operate',
      render: (_, record) => (
        <Space align="start" size="small">
          <Button className="!pl-0 !pr-0 mr-4" type="link" onClick={() => handleEdit(record.id)}>
            编辑
          </Button>
          <Button className="!pl-0 !pr-0" type="link" onClick={() => handleDel(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ]
  return (
    <section className="m-10">
      <div onClick={() => setSearchKey('出发')}>点击</div>
      <Table<Commodity> columns={columns} loading={isLoading} dataSource={data?.data?.list} />
    </section>
  )
}
