import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/commodity/category/sort'

export interface Props {
  id: string
  targetId: string
  isGap: boolean
}

const fetcher = async (props: Props) => await post<Record<never, never>>(url, props)

export default function useSort() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
