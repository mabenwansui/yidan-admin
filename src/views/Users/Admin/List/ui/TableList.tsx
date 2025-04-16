'use client'
import '@ant-design/v5-patch-for-react-19'
import { useMemo } from 'react'
import { Table, Space, Popconfirm, TableProps } from 'antd'
import { AdminUser } from '@/common/types/user'
import { ROLE } from '@/common/constants/role'
import SelectRole from './SelectRole'

interface Props {
  list: AdminUser[]
  isLoading: boolean
  curPage: number
  pageSize: number
  total: number
  isFirstLoad: boolean
  handleDel: (id: string) => void
  handlePageChange: (curPage: number) => void
}
export default function TableList(props: Props) {
  const { list, isLoading, curPage, pageSize, total, isFirstLoad, handleDel, handlePageChange } = props
  const handleRoleChange = useMemo(
    () => async (val: ROLE.ADMIN | ROLE.STAFF, record: AdminUser) => {
      // await updateRole({
      //   id: record.id,
      //   role: [val]
      // })
    },
    []
  )
  const columns: TableProps<AdminUser>['columns'] = useMemo(
    () => [
      {
        title: '用户id',
        width: 180,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        width: 150,
        dataIndex: 'username'
      },
      {
        title: '昵称',
        width: 150,
        dataIndex: 'nickname'
      },
      {
        title: '角色',
        dataIndex: 'role',
        width: 140,
        render: (_, record) => {
          return (
            <SelectRole
              defaultValue={record.role}
              style={{ width: 100 }}
              onChange={(val) => handleRoleChange(val, record)}
            />
          )
        }
      },
      {
        title: '手机号',
        width: 150,
        dataIndex: 'phoneNumber'
      },
      {
        title: '所属',
        minWidth: 150,
        dataIndex: 'project'
      },
      {
        title: '操作',
        width: 100,
        key: 'operate',
        render: (_, record) => (
          <Space align="start" size="small">
            <Popconfirm okButtonProps={{ danger: true }} title="确认删除吗?" onConfirm={() => handleDel(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      }
    ],
    [handleDel, handleRoleChange]
  )
  return (
    <Table<AdminUser>
      rowKey={(record) => record.id}
      columns={columns}
      loading={{
        delay: isFirstLoad === true ? 0 : 200,
        spinning: isLoading
      }}
      dataSource={list}
      pagination={{ current: curPage, pageSize, total, onChange: handlePageChange }}
    />
  )
}
