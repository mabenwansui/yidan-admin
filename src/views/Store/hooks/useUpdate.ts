import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { Store } from '@/common/types/store'

export const url = '/api/store/update'

type Props = Store

const fetcher = async (arg: Props) => await post<Record<never, never>>(url, arg)
export default function useCreate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
