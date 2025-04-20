import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/commodity/category/create'

export interface Props {
  title: string
  parentId?: string
}
export interface ResonseData {
  id: string
  title: string
  parentId: string
  level: number
}

const fetcher = async (props: Props) => await post<ResonseData>(url, props)

export default function useCreate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
