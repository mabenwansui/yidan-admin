import { useSWRTrigger } from '@/common/hooks/useAjax'
import { BranchForm } from '@/common/types/branch'

export const createUrl = '/api/sbranchtore/create'
export const updateUrl = '/api/branch/update'
export const deleteUrl = '/api/branch/delete'

export function useCreateBranch() {
  return useSWRTrigger<BranchForm, { id: string }>(createUrl)
}

export function useUpdateBranch() {
  return useSWRTrigger<BranchForm, Record<never, never>>(updateUrl)
}

export function useDeleteBranch() {
  return useSWRTrigger<{ id: string }, Record<never, never>>(deleteUrl)
}
