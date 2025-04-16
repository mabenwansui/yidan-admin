'use client'
import '@ant-design/v5-patch-for-react-19'
import { useMemo } from 'react'
import { Table, Button, Tooltip, Space, Popconfirm, TableProps } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'
import { AdminUser } from '@/common/types/user'
import { ROLE } from '@/common/constants/role'
import useUpdateRole from './hooks/useUpdateRole'
import useListSearch from './hooks/useListSearch'
import useDelete from './hooks/useDelete'
import SelectRole from './ui/SelectRole'

export default function AdminList() {
  const { index, list, isLoading, refresh, curPage, pageSize, total } = useListSearch()
  const { trigger: updateRole } = useUpdateRole()
  const { trigger: deleteUser } = useDelete()

  const handleDel = useMemo(
    () => async (id: string) => {
      await deleteUser({ id })
      refresh(curPage)
    },
    [deleteUser, curPage, refresh]
  )
  const handleChange = (curPage: number) => refresh(curPage)
  const handleRoleChange = useMemo(
    () => async (val: ROLE.ADMIN | ROLE.STAFF, record: AdminUser) => {
      await updateRole({
        id: record.id,
        role: [val]
      })
    },
    [updateRole]
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
    <section>
      <div className="flex justify-end mb-4 -mt-2">
        <Tooltip title="新注册的账户默认为员工账户，您可以通过此页面为其设置管理员权限">
          <Button type="text" target="_blank" href="/user/register" icon={<RightCircleOutlined />} iconPosition="end">
            注册新账户
          </Button>
        </Tooltip>
      </div>
      <Table<AdminUser>
        rowKey={(record) => record.id}
        columns={columns}
        loading={{
          delay: index === 0 ? 0 : 200,
          spinning: isLoading
        }}
        dataSource={list}
        pagination={{ current: curPage, pageSize, total, onChange: handleChange }}
      />
    </section>
  )
}
