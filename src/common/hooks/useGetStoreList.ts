import { useMemo } from 'react'
import { Store } from '@/common/types/store'
import { Page } from '@/common/types/page'
import { useSWRList } from '@/common/hooks/useAjax'

const url = '/api/store/search'

interface Response extends Page {
  list: Store[]
}

export default function useGetStoreList() {
  const { list, ...rest } = useSWRList<Record<never, never>, Response>(url, {})
  const formatList = useMemo(
    () =>
      list?.map((item) => ({
        openFormat: item.open ? '营业中' : '已停业',
        ownerFormat: item.owner?.map((item) => item.nickname).join(', ') || '',
        ...item
      })),
    [list]
  )
  return {
    list: formatList,
    ...rest
  }
}
