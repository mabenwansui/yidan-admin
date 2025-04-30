import { useSWRList } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'
import { Page } from '@/common/types/page'
import { OnShelfStatus } from '@/common/constants/fields'

const url = '/api/branch/search-commodity'

interface Params extends Page {
  key?: string
  storeId: string
  commodityId?: string
  isOnShelf?: boolean
  categoryId?: string
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
      isOnShelfFormat: item.isOnShelf ? OnShelfStatus.On : OnShelfStatus.Off,
      ...rest
    }
  })
}

export default function useGetBranchList(params: Params) {
  const { list, ...rest } = useSWRList<Params, Response>(url, params)
  return {
    list: dataFormat(list),
    ...rest
  }
}
