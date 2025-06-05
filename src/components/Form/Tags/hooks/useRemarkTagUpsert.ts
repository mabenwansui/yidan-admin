import { useSWRTrigger } from '@/common/hooks/useAjax'
import { Tag, TagType } from '@/common/types/tag'

export const createUrl = '/api/tag/create'
export const deleteUrl = '/api/tag/admin/delete'

type CreateParams = Pick<Tag, 'name'>
export function useCreateTag() {
  function formatArg(params: CreateParams) {
    return {
      ...params,
      isSystem: true,
      type: TagType.REMARK
    }
  }
  return useSWRTrigger<CreateParams, { id: string }>(createUrl, formatArg)
}

export function useDeleteTag() {
  return useSWRTrigger<{ id: string }, Record<never, never>>(deleteUrl)
}
