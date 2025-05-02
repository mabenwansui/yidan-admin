'use client'
import { Table } from 'antd'
import { Commodity } from '@/common/types/commodity'
import Image from '@/components/Image'
import TableOperate, { OperateType } from '@/components/TableOperate'

interface Props {
  list?: Commodity[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  isFirstLoad: boolean
  onEdit?: (record: Commodity) => void
  onDel?: (record: Commodity) => void
  onPageChange?: (curPage: number) => void
}

export default function List(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, onEdit, onDel, onPageChange } = props
  const renderImage = (imgUrls: string, record: Commodity) => <Image imgUrl={imgUrls} alt={record.name} />
  const renderName = (name: string) => <a>{name}</a>
  const renderOperate = (_: any, record: Commodity) => (
    <TableOperate
      btnList={[
        { type: OperateType.EDIT, onTrigger: () => onEdit?.(record) },
        { type: OperateType.DEL, onTrigger: () => onDel?.(record) }
      ]}
    />
  )
  return (
    <section>
      <Table<Commodity>
        rowKey={(record) => record.id}
        loading={{
          delay: isFirstLoad === true ? 0 : 200,
          spinning: isLoading
        }}
        sticky={true}
        dataSource={list}
        pagination={{ current: curPage, pageSize, total, onChange: onPageChange }}
      >
        <Table.Column title="封面图" width={106} dataIndex="coverImageUrl" render={renderImage} />
        <Table.Column title="商品名称" dataIndex="name" render={renderName} />
        <Table.Column title="原价" width={90} dataIndex="originalPrice" />
        <Table.Column title="现价" width={90} dataIndex="price" />
        <Table.Column title="分类" dataIndex="categoryFormat" />
        <Table.Column title="操作" width={150} key="operate" render={renderOperate} />
      </Table>
    </section>
  )
}
