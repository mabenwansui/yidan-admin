// import useSWR, { SWRConfiguration, SWRResponse, Fetcher as SWRFetcher, Key } from 'swr'
import { swrErrorHandleMiddleware } from './swrMiddleware'
import useSWR, { SWRHook, SWRConfiguration, Fetcher, Key } from 'swr'

// const useCustomSWR = <Data = unknown, Error = unknown>(
//   key: Key,
//   fetcher: SWRFetcher<Data>,
//   options: SWRConfiguration<Data, Error> = {}
// ): SWRResponse<Data, Error> => {
//   return useSWR<Data, Error>(key, fetcher, {
//     use: [swrErrorHandleMiddleware],
//     ...options
//   })
// }

const withArgs = <SWRType>(hook: any) => {
  return function useSWRArgs(...args: any) {
    const [key, fn, _config] = args
    const config = {
      use: [swrErrorHandleMiddleware],
      ..._config
    }
    return hook(key, fn, config)
  } as unknown as SWRType
}

const useCustomSWR = withArgs<SWRHook>(useSWR)

export default useCustomSWR
