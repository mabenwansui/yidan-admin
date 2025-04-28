import { memo } from 'react'
import { Table } from 'antd'
import { Branch } from '@/common/types/branch'
import TableOperate, { OperateType } from '@/components/TableOperate'

interface Props {
  list?: Branch[]
  isLoading?: boolean
  curPage?: number
  pageSize?: number
  total?: number
  isFirstLoad?: boolean
  onEdit?: (record: Branch) => void
  onDel?: (id: string) => void
  onPageChange?: (curPage: number) => void
}

function TableList(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, onEdit, onDel, onPageChange } = props
  const renderOperate = (_: any, record: Branch) => (
    <TableOperate
      btnList={[
        { type: OperateType.EDIT, onTrigger: () => onEdit?.(record) },
        { type: OperateType.DEL, onTrigger: () => onDel?.(record.id!) }
      ]}
    />
  )
  return (
    <Table<Branch>
      rowKey={(record) => record.id!}
      loading={{
        delay: isFirstLoad === true ? 0 : 200,
        spinning: isLoading
      }}
      dataSource={list}
      pagination={{ current: curPage, pageSize, total, onChange: onPageChange }}
    >
      <Table.Column title="商品名称" className="min-w-40" dataIndex="commodityName" />
      <Table.Column title="分类" className="min-w-30 w-35" dataIndex="commodityCategory" />
      <Table.Column title="库存" className="min-w-25 w-33" dataIndex="stockConunt" />
      <Table.Column title="已售" className="min-w-25 w-33" dataIndex="soldCount" />
      <Table.Column title="价格" className="min-w-25 w-33" dataIndex="price" />
      <Table.Column title="上架状态" className="min-w-25 w-33" dataIndex="isOnShelfFormat" />
      <Table.Column title="操作" className="min-w-30 w-33" key="operate" render={renderOperate} />
    </Table>
  )
}
export default memo(TableList)
