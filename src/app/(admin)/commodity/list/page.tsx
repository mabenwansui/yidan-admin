'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState, useMemo, useEffect } from 'react'
import { App } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { Commodity } from '@/common/types/commodity'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { mergeSearchParams } from '@/common/utils/url'
import useGetCommodityList from '../_hooks/useGetCommodityList'
import useCreateCommodity from '../_hooks/useCreateCommodity'
import useDeleteCommodity from '../_hooks/useDeleteCommodity'
import CommodityTableList from '../_ui/CommodityTableList'
import CommoditySearch from '../_ui/CommoditySearch'
import { Drawer, DrawerFormType, CommoditySubmitValues } from '../_ui/CommodityForm'

export default function CommodityListPage() {
  const _searchParams = useSearchParams()
  const searchParams = useMemo(() => {
    return {
      curPage: Number(_searchParams.get('curPage')) || 1
    }
  }, [_searchParams])
  const { isFirstLoad, list, isLoading, curPage, pageSize, refresh, total } = useGetCommodityList(searchParams)
  const [createDrawerKey] = useState<string>()
  const [createOpen, setCreateOpen] = useState(false)
  const { message } = App.useApp()
  const router = useRouter()
  const { trigger: create } = useCreateCommodity()
  const { trigger: del } = useDeleteCommodity()
  useEffect(() => {
    // 当访问不存在的页码时，自动跳转到第一页 如:删除列表最后一条数据时等
    if (list?.length === 0 && curPage && curPage > 1) {
      refresh({ curPage: 1 })
      router.push(mergeSearchParams({ curPage: 1 }))
    }
  }, [list, curPage, router, refresh])
  useEffect(() => router.prefetch(ROUTE_PATH.COMMODITY_EDIT), [router])

  const handleOpentCreateCommodity = () => setCreateOpen(true)
  const handleOpenUpdateCommodity = (record: Commodity) => router.push(`${ROUTE_PATH.COMMODITY_EDIT}/${record.id}`)
  const handleCreateSubmit = async (values: CommoditySubmitValues) => {
    const { category, imgNames, ...rest } = values
    const { flag } = await create({
      imgNames: imgNames?.map((item) => item.name) || [],
      category: category?.value,
      ...rest
    })
    if (flag === 1) {
      message.success('创建成功')
      setCreateOpen(false)
      refresh()
    }
  }
  const handleDelCommodity = async (record: Commodity) => {
    const { flag } = await del({ id: record.id })
    if (flag === 1) {
      message.success('删除成功')
      refresh()
    }
  }
  const handlePageChange = (curPage: number) => {
    refresh({ curPage })
    router.push(mergeSearchParams({ curPage }))
  }
  return (
    <section>
      <CommoditySearch onCreate={handleOpentCreateCommodity} />
      <Drawer
        formKey={createDrawerKey}
        type={DrawerFormType.CREATE}
        open={createOpen}
        onSubmit={handleCreateSubmit}
        onClose={() => setCreateOpen(false)}
      />
      <CommodityTableList
        onEdit={handleOpenUpdateCommodity}
        onDel={handleDelCommodity}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        list={list}
        curPage={curPage}
        pageSize={pageSize}
        total={total}
        isFirstLoad={isFirstLoad}
      />
    </section>
  )
}
