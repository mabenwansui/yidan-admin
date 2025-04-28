import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

interface Props extends Omit<Commodity, 'category'> {
  category: string
}

export const url = '/api/commodity/create'
const fetcher = async (arg: Props) => await post<Record<never, never>>(url, arg)

export default function useCreate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
