import { useSWRTrigger } from '@/common/hooks/useAjax'
import { BranchForm } from '@/common/types/branch'

export const createUrl = '/api/branch/create'
export const updateUrl = '/api/branch/update'
export const deleteUrl = '/api/branch/delete'

function formatData(formData: BranchForm) {
  const { commodity, ...rest } = formData
  return {
    ...rest,
    commodityId: commodity?.value
  }
}

export function useCreateBranch() {
  return useSWRTrigger<BranchForm, { id: string }>(createUrl, formatData)
}

export function useUpdateBranch() {
  return useSWRTrigger<BranchForm, Record<never, never>>(updateUrl, formatData)
}

export function useDeleteBranch() {
  return useSWRTrigger<{ id: string }, Record<never, never>>(deleteUrl)
}
