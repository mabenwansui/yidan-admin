import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Tag, TagType } from '@/common/types/tag'

export const createUrl = '/api/tag/admin/create'
export const sortUrl = '/api/tag/remark/admin/sort'
export const deleteUrl = '/api/tag/admin/delete'

type CreateParams = Pick<Tag, 'name'>
export function useCreateTag() {
  function formatArg(params: CreateParams) {
    return {
      ...params,
      type: TagType.REMARK,
      isSystem: true
    }
  }
  return useSWRTrigger<CreateParams, { id: string }>(createUrl, formatArg)
}

interface SortParams {
  active: Pick<Tag, 'id' | 'sort'>
  over: Pick<Tag, 'id' | 'sort'>
}
export function useSortTag() {
  function formatArg(params: SortParams) {
    return {
      ...params,
      type: TagType.REMARK,
      isSystem: true
    }
  }
  return useSWRTrigger<SortParams, Record<never, never>>(sortUrl, formatArg)
}

export function useDeleteTag() {
  return useSWRTrigger<{ id: string }, Record<never, never>>(deleteUrl)
}
