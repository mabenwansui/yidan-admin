'use client'
import '@ant-design/v5-patch-for-react-19'
import { useMemo, useCallback } from 'react'
import { Button, Tooltip } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'
import useListSearch from './hooks/useListSearch'
import useDelete from './hooks/useDelete'
import TableList from './ui/StaffTableList'

export default function UserList() {
  const { index, list, isLoading, refresh, curPage, pageSize, total } = useListSearch({}, 'staff')
  const { trigger: deleteUser } = useDelete()
  // 首次加载显示加载动画，避免空数据状态；后续为了避免页面抖动，加载动画显示延迟。新数据加载完成前，会使用旧数据，利用 SWR 的缓存特性
  const isFirstLoad = useMemo(() => (index === 0 ? true : false), [index])
  const handleDel = useCallback(
    () => async (id: string) => {
      await deleteUser({ id })
      refresh(curPage)
    },
    [deleteUser, curPage, refresh]
  )
  const handlePageChange = useCallback(() => (curPage: number) => refresh(curPage), [refresh])
  return (
    <section>
      <div className="flex justify-end mb-2 -mt-3">
        <Tooltip placement="bottomRight" title="新注册的账户默认为员工账户, 可联系超管更改权限">
          <Button type="text" target="_blank" href="/user/register" icon={<RightCircleOutlined />} iconPosition="end">
            注册新账户
          </Button>
        </Tooltip>
      </div>
      <TableList
        list={list}
        isLoading={isLoading}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
        isFirstLoad={isFirstLoad}
        onDel={handleDel}
        onPageChange={handlePageChange}
      />
    </section>
  )
}
