import { swrErrorHandleMiddleware } from './swrMiddleware'
import useSWR, { SWRHook } from 'swr'

const withArgs = <SWRType>(hook: any) => {
  return function useSWRArgs(...args: any) {
    const [key, fn, _config] = args
    const config = {
      use: [swrErrorHandleMiddleware],
      revalidateOnFocus: false,
      ..._config
    }
    return hook(key, fn, config)
  } as unknown as SWRType
}

const useCustomSWR = withArgs<SWRHook>(useSWR)

export default useCustomSWR
