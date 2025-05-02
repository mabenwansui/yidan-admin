import { useSWRList } from '@/common/hooks/useAjax'
import { Page } from '@/common/types/page'
import { Commodity } from '@/common/types/commodity'

const url = '/api/commodity/search'

interface Params {
  key?: string
  curPage?: number
}

interface Response extends Page {
  list: Commodity[]
}

export interface FormatStore extends Commodity {
  categoryFormat: string
}

const dataFormat = (list?: Commodity[]) => {
  return list?.map((item) => {
    return {
      categoryFormat: item?.category?.title,
      ...item
    }
  })
}

export default function useGetCommodityList(params: Params = {}) {
  const { list, ...rest } = useSWRList<Params, Response>(url, params)
  return {
    list: dataFormat(list),
    ...rest
  }
}
