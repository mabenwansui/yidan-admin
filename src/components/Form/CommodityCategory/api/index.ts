import { post } from '@/common/utils/ajax'

export interface CreateCommodityCategoryApiProps {
  name: string
  parentId?: string
}
/** 创建 */
export const createCommodityCategoryApiUrl = '/api/commodity/category/create'
export async function createCommodityCategoryApi(props: CreateCommodityCategoryApiProps) {
  return await post<{
    id: string
    name: string
  }>(createCommodityCategoryApiUrl, props)
}
export async function createCommodityCategoryApiMutation(
  url: string,
  { arg }: { arg: CreateCommodityCategoryApiProps }
) {
  return await createCommodityCategoryApi(arg)
}

interface CommodityCategoryListItem {
  id: string
  title: string
  children: CommodityCategoryListItem[]
}
/** 获取列表 */
export const commodityCategoryListApiUrl = '/api/commodity/category/list'
export async function commodityCategoryListApi() {
  return await post<{ list: Array<CommodityCategoryListItem> }>(commodityCategoryListApiUrl)
}

/** 删除 */
export const deleteCommodityCategoryApiUrl = '/api/commodity/category/delete'
export async function deleteCommodityCategoryApi(props: CreateCommodityCategoryApiProps) {
  return await post<{
    id: string
    name: string
  }>(deleteCommodityCategoryApiUrl, props)
}
export async function deleteCommodityCategoryApiMutation(
  url: string,
  { arg }: { arg: CreateCommodityCategoryApiProps }
) {
  return await deleteCommodityCategoryApi(arg)
}

// export interface CommoditySearchApiProps {
//   search?: string
//   curPage?: number
//   pageSize?: number
// }
// export const commoditySearchApiUrl = '/api/commodity/search'
// export async function commoditySearchApi(props: CommoditySearchApiProps = {}) {
//   const result = await post<{
//     list: Array<Commodity>
//     pageSize: number
//     curPage: number
//     total: number
//   }>(commoditySearchApiUrl, props)
//   if (result?.data?.list) {
//     result.data.list = result.data.list.map((item) => {
//       return {
//         ...item,
//         key: item.id
//       }
//     })
//   }
//   return result
// }
