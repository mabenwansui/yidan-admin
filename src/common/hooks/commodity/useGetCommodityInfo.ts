import { post } from '@/common/utils/ajax'
import { useSWR, useSWRMutation } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

type Response = Omit<Commodity, 'category'> & { category: { id: string; title: string } }

interface Props {
  id: string
}
export const url = '/api/commodity/get-info'
const fetcher = async ({ arg }: { arg: Props }) => await post<Response>(url, arg)
export default function useGetCommodityInfo(id: string) {
  const { data, isLoading } = useSWR(
    {
      url: `${url}`,
      arg: { id }
    },
    fetcher
  )
  return {
    data: data?.data,
    isLoading
  }
}

const fetcherMutation = async (url: string, { arg }: { arg: Props }) => await post<Response>(url, arg)
export function useGetCommodityInfoMutation() {
  const { trigger } = useSWRMutation(url, fetcherMutation)
  return { trigger }
}
