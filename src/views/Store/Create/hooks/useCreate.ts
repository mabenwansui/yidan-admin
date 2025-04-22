import { post } from '@/common/utils/ajax'
import { useSWRMutation } from '@/common/hooks/useAjax'

export const url = '/api/store/create'

export enum OPEN_STATUS {
  OPEN = 'open',
  CLOSE = 'close'
}

export interface Props {
  id: string
  name: string
  owner?: string[]
  imgNames?: string[]
  coverImageUrl?: string
  description?: string
  city?: string
  address?: string
  open?: OPEN_STATUS.OPEN | OPEN_STATUS.CLOSE
}

const fetcher = async (arg: Props) => await post<Record<never, never>>(url, arg)
export default function useCreate() {
  const { trigger } = useSWRMutation(url, async (url: string, { arg }: { arg: Props }) => await fetcher(arg))
  return { trigger }
}
