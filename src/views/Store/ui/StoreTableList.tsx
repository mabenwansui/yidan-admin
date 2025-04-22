'use client'
import { useCallback, memo } from 'react'
import { Table, Space, Popconfirm } from 'antd'
import { Store } from '@/common/types/store'
import { User } from '@/common/types/user'
import { City } from '@/common/types/city'
import Image from '@/components/Image'

interface Props {
  list?: Store[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  isFirstLoad: boolean
  onDel?: (id: string) => void
  onPageChange?: (curPage: number) => void
}

function TableList(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, onDel, onPageChange } = props
  const renderImage = (url: string, record: Store) => <Image imgUrl={url} alt={record.name} />
  const renderOwner = (owner: User[]) => owner.map((item) => item.nickname).join()
  const renderOpen = (open: boolean) => (open ? '营业中' : '已停业')
  const renderCity = (city: City) => city.map((item) => item.label).join()
  const renderOperate = useCallback(
    (_: any, record: Store) => {
      return (
        <Space align="start" size="small">
          <a className="mr-1.5">编辑</a>
          <Popconfirm okButtonProps={{ danger: true }} title="确认删除吗?" onConfirm={() => onDel?.(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    },
    [onDel]
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
      <Table.Column title="店铺名" width={200} dataIndex="name" />
      <Table.Column title="店长" width={130} dataIndex="owner" render={renderOwner} />
      <Table.Column title="店铺地址" dataIndex="city" render={renderCity} />
      <Table.Column title="营业状态" width={140} dataIndex="open" render={renderOpen} />
      <Table.Column title="操作" width={114} key="operate" render={renderOperate} />
    </Table>
  )
}
export default memo(TableList)
