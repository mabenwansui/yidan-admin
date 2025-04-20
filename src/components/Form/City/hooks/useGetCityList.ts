import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/map/district/getchildren'

interface Props {
  keyword: string
}

export interface Response {
  name: string // 行政区划名称
  gb: string // GB 码
  pgb?: string // 父级 GB 码
  level: number // 行政级别
}

const fetcher = async (arg: Props) => await post<Response[]>(url, arg)
export default function useGetCityList() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
