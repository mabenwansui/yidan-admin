import useSWR, { SWRConfiguration, SWRResponse, Fetcher as SWRFetcher, Key } from 'swr'
import { swrErrorHandleMiddleware } from './swrMiddleware'

const useCustomSWR = <Data = unknown, Error = unknown>(
  key: Key,
  fetcher: SWRFetcher<Data>,
  options: SWRConfiguration<Data, Error> = {}
): SWRResponse<Data, Error> => {
  return useSWR<Data, Error>(key, fetcher, {
    use: [swrErrorHandleMiddleware],
    ...options
  })
}
export default useCustomSWR
