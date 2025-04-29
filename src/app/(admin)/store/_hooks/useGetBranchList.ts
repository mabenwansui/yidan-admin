import useSWRList from '@/common/hooks/useAjax/useSWRList'
import { Branch } from '@/common/types/branch'
import { Page } from '@/common/types/page'

interface Params extends Page {
  key?: string
  storeId: string
}

interface Response extends Page {
  list: Branch[]
}

function dataFormat(list: Branch[]) {
  return list?.map((item) => {
    const { commodity, ...rest } = item
    return {
      commodityName: commodity?.name,
      commodityId: commodity?.id,
      commodityCategory: commodity?.category?.title,
      isOnShelfFormat: item.isOnShelf ? '上架中' : '已下架',
      ...rest
    }
  })
}

export default function useGetBranchList(params: Params) {
  const { list, ...rest } = useSWRList<Params, Response>('/api/branch/search-commodity', params)
  return {
    list: dataFormat(list),
    ...rest
  }
}
