import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'

export const url = '/api/branch/create'

type Props = Branch

const fetcher = async (arg: Props) => await post<{ id: string }>(url, arg)
export default function useCreateBranch() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
