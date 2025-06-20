import { useSWR } from '@/common/hooks/useAjax'
import { post } from '@/common/utils/ajax'
import { Page } from '@/common/types/page'
import { Store } from '@/common/types/store'

const url = '/api/store/search'

interface Response extends Page {
  list: Store[]
}

const fetcher = async () => {
  const data = await post<Response>(url, {})
  data.data.list = data.data.list?.map((item) => {
    return {
      openFormat: item.open ? '营业中' : '已停业',
      ownerFormat: item.owner?.map((item) => item.nickname).join(', ') || '',
      ...item
    }
  })
  return data
}
export default function useGetStoreList() {
  const { data, isLoading, mutate } = useSWR(url, fetcher)
  return {
    list: data?.data.list,
    isLoading,
    mutate
  }
}
