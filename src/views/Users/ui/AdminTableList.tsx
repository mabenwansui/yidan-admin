'use client'
import '@ant-design/v5-patch-for-react-19'
import { useCallback, memo } from 'react'
import { Table, Space, Popconfirm } from 'antd'
import { User } from '@/common/types/user'
import { ROLE } from '@/common/constants/role'

interface Props {
  list: User[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  isFirstLoad: boolean
  onDel?: (id: string) => void
  onPageChange?: (curPage: number) => void
}

const roleMapping = {
  [ROLE.ADMIN]: '管理员',
  [ROLE.STAFF]: '员工'
}

type IUser = Omit<User, 'role'> & { role: (ROLE.ADMIN | ROLE.STAFF)[] }

function TableList(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, onDel, onPageChange } = props
  const renderRole = useCallback((_: any, record: IUser) => record.role.map((item) => roleMapping[item]).join(), [])
  const renderOperate = useCallback(
    (_: any, record: User) => {
      return (
        <Space align="start" size="small">
          <Popconfirm okButtonProps={{ danger: true }} title="确认删除吗?" onConfirm={() => onDel?.(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    },
    [onDel]
  )
  return (
    <Table<User>
      rowKey={(record) => record.id}
      loading={{
        delay: isFirstLoad === true ? 0 : 200,
        spinning: isLoading
      }}
      dataSource={list}
      pagination={{ current: curPage, pageSize, total, onChange: onPageChange }}
    >
      <Table.Column title="用户id" width={180} dataIndex="id" />
      <Table.Column title="用户名" width={150} dataIndex="username" />
      <Table.Column title="昵称" width={150} dataIndex="nickname" />
      <Table.Column title="角色" width={140} dataIndex="role" render={renderRole} />
      <Table.Column title="手机号" width={150} dataIndex="phoneNumber" />
      <Table.Column title="所属" dataIndex="所属" />
      <Table.Column title="操作" width={100} key="operate" render={renderOperate} />
    </Table>
  )
}
export default memo(TableList)
