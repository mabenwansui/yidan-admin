import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import { post } from '@/common/utils/ajax'
import logger from '@/common/utils/logger'

type ObjectType = Record<string, unknown>

interface Fetcher {
  url: string
  params: Record<string, string>
}

export function useAjax<T extends ObjectType>(
  url: string,
  params: Record<string, string> = {},
  options: SWRConfiguration = {}
) {
  const { data, error, isLoading } = useSWR(
    {
      url,
      params
    },
    ({ url, params }: Fetcher) => post<T>(url, params),
    options
  )
  if (error) logger.error(error)
  return {
    flag: data?.flag || 0,
    data: data?.data,
    isLoading
  }
}

export function useAjaxTrigger<T extends ObjectType>(url: string) {
  const { trigger, isMutating } = useSWRMutation(
    url,
    async (url: string, { arg }: { arg: Record<string, string> | undefined }) => post<T>(url, arg)
  )
  return { trigger, isLoading: isMutating }
}
