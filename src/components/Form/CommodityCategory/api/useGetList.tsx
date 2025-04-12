import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'

export interface RequestListItem {
  id: string
  title: string
  parentId: string
  level: number
  children: RequestListItem[]
}

const empty: RequestListItem[] = []
export const url = '/api/commodity/category/form-list'

const fetcher = async () => await post<{ list: Array<RequestListItem> }>(url)

export default function useGetList() {
  const [key, setKey] = useState(0)
  const { data, isLoading } = useSWR(`${url}${key}`, fetcher, { shouldRetryOnError: false })
  return {
    list: data?.data?.list || empty,
    isLoading,
    refresh: () => setKey(key + 1)
  }
}
