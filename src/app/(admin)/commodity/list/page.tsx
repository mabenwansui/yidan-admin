'use client'
import '@ant-design/v5-patch-for-react-19'
import { useState } from 'react'
import { App } from 'antd'
import { Commodity } from '@/common/types/commodity'
import { SEARCH_PARAMS } from '@/common/constants/routePath'
import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'
import useGetCommodityList from '../_hooks/useGetCommodityList'
import useUpdateCommodity from '../_hooks/useUpdateCommodity'
import CommodityTableList from '../_ui/CommodityTableList'
import CommoditySearch from '../_ui/CommoditySearch'
import { Drawer, DrawerFormType, CommodityForm, CommoditySubmitValues } from '../_ui/CommodityForm'
import { useRouter } from 'next/navigation'

const formatDrawer = (record: Commodity): CommodityForm => {
  const { category, imgNames, ...rest } = record
  return {
    imgNames: imgNames?.map((item) => ({
      uid: item,
      name: item,
      status: 'done',
      url: `${SERVER_FILE_PREFIX.IMG}/${item}`
    })),
    ...(category && { category: { value: category.id, label: category.title } }),
    ...rest
  }
}

function changeUrl(curPage: string | number) {
  const newSearchParams = new URLSearchParams(window.location.search)
  newSearchParams.set(SEARCH_PARAMS.CUR_PAGE, String(curPage))
  return `${window.location.pathname}?${newSearchParams.toString()}`
}

export default function CommodityListPage() {
  const { isFirstLoad, list, isLoading, curPage, pageSize, refresh, total } = useGetCommodityList()
  const [updateDrawerKey, setUpdateDrawerKey] = useState<string>()
  const [createDrawerKey, setCreateDrawerKey] = useState<string>()
  const [updateOpen, setUpdateOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<CommodityForm>()
  const { message } = App.useApp()
  const router = useRouter()
  const { trigger: update } = useUpdateCommodity()
  const handleOpenUpdateCommodity = (record: Commodity) => {
    setInitialValues(formatDrawer(record))
    setUpdateOpen(true)
    setUpdateDrawerKey(record.id)
  }
  const handleDelCommodity = async (record: Commodity) => {
    //
  }
  const handlePageChange = (curPage: number) => {
    // refresh({ curPage })
    router.push(changeUrl(curPage))
  }
  const handleOpentCreateCommodity = () => {
    setCreateOpen(true)
  }
  const handleUpdateSubmit = async (values: CommoditySubmitValues) => {
    const { category, ...rest } = values
    const { flag } = await update({
      category: category?.value,
      ...rest
    })
    if (flag === 1) {
      message.success('更新成功')
      setUpdateOpen(false)
      refresh()
    }
  }
  const handleCreateSubmit = async (values: CommoditySubmitValues) => {
    //
  }
  return (
    <section>
      {/* <CommoditySearch onCreate={handleOpentCreateCommodity} /> */}
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
      <Drawer
        formKey={updateDrawerKey}
        type={DrawerFormType.EDIT}
        open={updateOpen}
        initialValues={initialValues}
        onSubmit={handleUpdateSubmit}
        onClose={() => setUpdateOpen(false)}
      />
    </section>
  )
}
