import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'

export const url = '/api/commodity/category/form-list'

interface Props {
  hasRootCategory?: boolean
}
export interface RequestListItem {
  id: string
  title: string
  parentId: string
  level: number
  children: RequestListItem[]
}
const empty: RequestListItem[] = []

const fetcher = async ({ args }: { url: string; args: Props }) => await post<{ list: RequestListItem[] }>(url, args)
export default function useGetList(props: Props = {}) {
  const { hasRootCategory = true } = props
  const [key, setKey] = useState(0)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${key}`,
      args: { hasRootCategory }
    },
    fetcher,
    { shouldRetryOnError: false }
  )
  return {
    list: data?.data?.list || empty,
    isLoading,
    refresh: () => setKey(key + 1)
  }
}
