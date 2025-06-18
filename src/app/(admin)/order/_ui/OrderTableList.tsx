'use client'
import { Table } from 'antd'
import { Commodity } from '@/common/types/commodity'
import Image from '@/components/Image'
import TableOperate, { OperateType } from '@/components/Table/TableOperate'

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
  const { list, isLoading, curPage = 1, pageSize, total, isFirstLoad, onEdit, onDel, onPageChange } = props
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
  const renderCommoditys = () => {
    return null
  }
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
        <Table.Column title="商品" width={106} dataIndex="commoditys" render={renderCommoditys} />
        <Table.Column title="备注" dataIndex="remark" render={renderName} />
        <Table.Column title="支付金额" width={90} dataIndex="actualAmount" />
        <Table.Column title="支付类型" width={90} dataIndex="paymentType" />
        <Table.Column title="支付状态" dataIndex="paymentStatus" />
        <Table.Column title="桌号" dataIndex="table_number" />
        <Table.Column title="创建时间" dataIndex="createAt" />
        <Table.Column title="操作" width={150} fixed="right" key="operate" render={renderOperate} />
      </Table>
    </section>
  )
}
