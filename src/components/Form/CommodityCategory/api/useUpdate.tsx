import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/commodity/category/update'

export interface Props {
  id: string
  title: string
}
export interface ResonseData {
  id: string
  parentId: string
  title: string
}

const fetcher = async (props: Props) => await post<ResonseData>(url, props)

export default function useUpdate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
