import { Key } from 'swr'
import useSWRMutation, {
  SWRMutationConfiguration,
  SWRMutationResponse,
  MutationFetcher,
  SWRMutationHook
} from 'swr/mutation'
import useErrorHandle from './useErrorHandle'
import { AjaxResponse, ObjectType } from '@/common/utils/ajax'

const useCustomSWRMutation: SWRMutationHook = <
  Data = unknown,
  Error = unknown,
  SWRMutationKey extends Key = Key,
  ExtraArg = never,
  SWRData = Data
>(
  key: SWRMutationKey,
  fetcher: MutationFetcher<Data, SWRMutationKey, ExtraArg>,
  options?: SWRMutationConfiguration<Data, Error, SWRMutationKey, ExtraArg, SWRData>
): SWRMutationResponse<Data, Error, SWRMutationKey, ExtraArg> => {
  const errorHandle = useErrorHandle()
  const mutation = useSWRMutation(key, fetcher, {
    ...options,
    onSuccess: async (data) => {
      const _data = data as AjaxResponse<ObjectType>
      if (_data && _data?.flag === 0) {
        errorHandle(_data.code, _data.msg)
      }
      return _data
    }
  })

  return mutation
}

export default useCustomSWRMutation
