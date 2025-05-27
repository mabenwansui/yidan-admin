import { useSWRTrigger } from '@/common/hooks/useAjax'
import { StoreForm } from '@/common/types/store'

export const createUrl = '/api/store/create'
export const updateUrl = '/api/store/update'
export const deleteUrl = '/api/store/delete'

type UpdateParams = StoreForm
type CreateParams = Omit<StoreForm, 'id'>

function formatArg(arg: CreateParams | UpdateParams) {
  const { addressLocation, ...rest } = arg
  const { city, poiName, poiAddress, lon, lat } = addressLocation
  return {
    city,
    poiName,
    poiAddress,
    lon,
    lat,
    ...rest
  }
}
export function useCreateStore() {
  return useSWRTrigger<CreateParams, { id: string }>(createUrl, formatArg)
}

export function useUpdateStore() {
  return useSWRTrigger<UpdateParams, Record<never, never>>(updateUrl, formatArg)
}

export function useDeleteStore() {
  return useSWRTrigger<{ id: string }, Record<never, never>>(deleteUrl)
}
