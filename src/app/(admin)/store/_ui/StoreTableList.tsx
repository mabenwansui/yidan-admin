import { memo } from 'react'
import { Table, Divider } from 'antd'
import Link from 'next/link'
import { Store } from '@/common/types/store'
import { User } from '@/common/types/user'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Image from '@/components/Image'
import TableOperate, { OperateType } from '@/components/Table/TableOperate'

interface Props {
  list?: Store[]
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
  const renderName = (name: string, record: Store) => (
    <Link href={`${ROUTE_PATH.STORE_COMMODITY}/${record.id}`}>{name}</Link>
  )
  const renderImage = (url: string, record: Store) => <Image src={url} alt={record.name} />
  const renderOwner = (owner: User[]) => owner.map((item) => item.nickname).join()
  const renderOpen = (open: boolean) => (open ? '营业中' : '已停业')
  const renderAddress = (_: any, record: Store) => (
    <>
      <div>
        {record?.city} <Divider type="vertical" /> {record?.poiName}
      </div>
      <div className="mt-0.5">{record.details}</div>
    </>
  )
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
      <Table.Column title="店铺名" width={200} dataIndex="name" render={renderName} />
      <Table.Column title="店长" width={130} dataIndex="owner" render={renderOwner} />
      <Table.Column title="店铺地址" dataIndex="city" render={renderAddress} />
      <Table.Column title="营业状态" width={140} dataIndex="open" render={renderOpen} />
      <Table.Column title="操作" width={114} key="operate" render={renderOperate} />
    </Table>
  )
}
export default memo(TableList)
