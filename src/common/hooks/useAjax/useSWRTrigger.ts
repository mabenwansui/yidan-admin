import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export default function useSWRTrigger<Params extends Record<string, any>, Response extends Record<string, any>>(
  url: string
) {
  const fetcher = async (arg: Params) => await post<Response>(url, arg)
  const { trigger } = useSWRMutation(url, async (_: string, { arg }: { arg: Params }) => await fetcher(arg))
  return { trigger }
}
