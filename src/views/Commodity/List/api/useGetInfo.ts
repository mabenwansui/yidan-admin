import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

type Response = Omit<Commodity, 'category'> & { category: { id: string; title: string } }

interface ArgsParams {
  url: string
  args: { id: string }
}

export const url = '/api/commodity/get-info'
const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)

export function useGetInfo(id: string) {
  const { data, isLoading } = useSWR(
    {
      url: `${url}`,
      args: { id }
    },
    fetcher
  )
  return {
    data: data?.data,
    isLoading
  }
}
