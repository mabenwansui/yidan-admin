import { memo } from 'react'
import { Table } from 'antd'
import { Store } from '@/common/types/store'
import { User } from '@/common/types/user'
import { Commodity } from '@/common/types/commodity'
import Image from '@/components/Image'
import TableOperate, { OperateType } from '@/components/TableOperate'

interface Props {
  list: Store[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  isFirstLoad: boolean
  onEdit?: (record: Store) => void
  onDel?: (id: string) => void
  onPageChange?: (curPage: number) => void
}

function TableList(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, onEdit, onDel, onPageChange } = props
  const renderImage = (url: string, record: Store) => <Image imgUrl={url} alt={record.name} />
  const renderOwner = (owner: User[]) => owner.map((item) => item.nickname).join()
  const renderTag = () => null
  const renderCategory = (category: Commodity['category']) => category?.title
  const renderIsOnShelf = (isOnShelf: boolean) => (isOnShelf ? '上架中' : '已下架')
  const renderOperate = (_: any, record: Store) => (
    <TableOperate
      btnList={[
        { type: OperateType.EDIT, onTrigger: () => onEdit?.(record) },
        { type: OperateType.DEL, onTrigger: () => onDel?.(record.id) }
      ]}
    />
  )
  return (
    <Table<Store>
      rowKey={(record) => record.id}
      loading={{
        delay: isFirstLoad === true ? 0 : 200,
        spinning: isLoading
      }}
      dataSource={list}
      pagination={{ current: curPage, pageSize, total, onChange: onPageChange }}
    >
      <Table.Column title="封面图" width={160} dataIndex="coverImageUrl" render={renderImage} />
      <Table.Column title="商品名称" width={200} dataIndex="name" />
      <Table.Column title="分类" dataIndex="category" render={renderCategory} />
      <Table.Column title="标签" dataIndex="tags" render={renderTag} />
      <Table.Column title="价格" width={130} dataIndex="originalPrice" render={renderOwner} />
      <Table.Column title="库存" width={140} dataIndex="stockConunt" />
      <Table.Column title="上架状态" width={140} dataIndex="isOnShelf" render={renderIsOnShelf} />
      <Table.Column title="操作" width={114} key="operate" render={renderOperate} />
    </Table>
  )
}
export default memo(TableList)
