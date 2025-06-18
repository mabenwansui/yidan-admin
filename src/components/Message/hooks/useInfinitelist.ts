import useSWRInfinite from '@/common/hooks/useAjax/useSWRInfinite'
import { post } from '@/common/utils/ajax'
import { SenderType } from '@/common/types/message'
import { AjaxResponse } from '@/common/utils/ajax/request'
import { Message } from '@/common/types/message'
import { Page } from '@/common/types/page'

interface Params {
  curPage?: number
  pageSize?: number
}
interface FetcherArg {
  url: string
  arg: Params
}
interface Response extends Page {
  list: Message[]
}
export const url = '/api/message/list'
const fetcher = async (params: FetcherArg) => {
  const { curPage, pageSize } = params.arg
  return await post<Response>(params.url, { curPage, pageSize, senderType: SenderType.SYSTEM })
}
export default function useInfinitelist(params: Params = {}, shouldFetch: boolean) {
  const getKey = (curPage: number, previousPageData: AjaxResponse<Response>) => {
    if (!shouldFetch) return null
    if (previousPageData) {
      const { total, pageSize, curPage } = previousPageData.data
      const totalPage = Math.ceil(total! / pageSize!)
      if (curPage! >= totalPage) {
        return null
      }
    }
    return {
      url,
      arg: {
        curPage: curPage + 1,
        pageSize: params.pageSize
      }
    }
  }
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })
  return {
    data,
    size,
    setSize
  }
}
