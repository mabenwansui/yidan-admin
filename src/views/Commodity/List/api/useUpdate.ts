import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'

export const url = '/api/commodity/update'

const fetcher = async (arg: Commodity) => await post<Record<never, never>>(url, arg)

export default function useUpdate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Commodity }) => await fetcher(arg))
  return { trigger }
}
