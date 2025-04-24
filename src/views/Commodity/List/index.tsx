'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Table, TableProps, App } from 'antd'
import { Commodity } from '@/common/types/commodity'
import { SEARCH_PARAMS } from '@/common/constants/routePath'
import Image from '@/components/Image'
import TableOperate, { OperateType } from '@/components/TableOperate'
import EditDrawer from './ui/EditDrawer'
import useListSearch from './api/useListSearch'
import useDelete from './api/useDelete'

function getUrl(curPage: string | number) {
  const newSearchParams = new URLSearchParams(window.location.search)
  newSearchParams.set(SEARCH_PARAMS.CUR_PAGE, String(curPage))
  return `${window.location.pathname}?${newSearchParams.toString()}`
}

export default function List() {
  const [id, setId] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const curPage = Number(searchParams.get(SEARCH_PARAMS.CUR_PAGE) ?? 1)
  const { list, isLoading, refresh } = useListSearch({ curPage })
  const { trigger: deleteTrigger } = useDelete()
  const router = useRouter()
  useEffect(() => {
    if (curPage > 1 && isLoading === false && list && list.length === 0) {
      router.push(getUrl(1))
    }
  }, [curPage, list, router, isLoading])
  const { message } = App.useApp()
  const handleEdit = useCallback((id: string) => {
    setId(id)
    setOpen(true)
  }, [])
  const handleDrawerClose = useCallback(() => {
    setOpen(false)
  }, [])
  const handleDel = useCallback(
    async (id: string) => {
      const { flag } = await deleteTrigger(id)
      if (flag === 1) {
        message.success('删除成功！')
        refresh()
      }
    },
    [message, deleteTrigger, refresh]
  )
  const handleChange = (page: number) => router.push(getUrl(page))
  const handleDrawerSubmit = useCallback(() => {
    setOpen(false)
    refresh()
  }, [refresh])
  const columns: TableProps<Commodity>['columns'] = useMemo(
    () => [
      {
        title: '封面图',
        dataIndex: 'imgNames',
        width: 106,
        render: (imgUrls: Array<string>, record) => {
          return <Image imgUrl={imgUrls[0]} alt={record.name} />
        }
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>
      },
      {
        title: '原价',
        width: 90,
        dataIndex: 'originalPrice'
      },
      {
        title: '现价',
        width: 90,
        dataIndex: 'price'
      },
      {
        title: '分类',
        dataIndex: 'category',
        render: (category: Commodity['category']) => category?.title
      },
      {
        title: '操作',
        width: 150,
        key: 'operate',
        render: (_, record) => (
          <TableOperate
            btnList={[
              { type: OperateType.EDIT, onTrigger: () => handleEdit(record.id) },
              { type: OperateType.DEL, onTrigger: () => handleDel(record.id) }
            ]}
          />
        )
      }
    ],
    [handleEdit, handleDel]
  )
  return (
    <section>
      <Table<Commodity>
        rowKey={(record) => record.id}
        columns={columns}
        loading={isLoading}
        dataSource={list}
        pagination={{ current: curPage, pageSize: 10, onChange: handleChange }}
      />
      {id && <EditDrawer id={id} open={open} onSubmit={handleDrawerSubmit} onClose={handleDrawerClose} />}
    </section>
  )
}
