import { useSWRList } from '@/common/hooks/useAjax'
import { Page } from '@/common/types/page'
import { Store } from '@/common/types/store'

const url = '/api/store/search'

type Params = Record<never, never>
interface Response extends Page {
  list: Store[]
}

export interface FormatStore extends Store {
  cityFormat: string
  openFormat: string
  ownerFormat: string
}

const dataFormat = (list?: Store[]) => {
  return list?.map((item) => {
    return {
      cityFormat: item.city?.map((item) => item.label).join(', ') || '',
      openFormat: item.open ? '营业中' : '已停业',
      ownerFormat: item.owner?.map((item) => item.nickname).join(', ') || '',
      ...item
    }
  })
}

export default function useGetStoreList(params: Params = {}) {
  const { list, ...rest } = useSWRList<Params, Response>(url, params)
  return {
    list: dataFormat(list),
    ...rest
  }
}
