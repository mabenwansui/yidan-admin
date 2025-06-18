import { swrErrorHandleMiddleware } from './swrMiddleware'
import useSWRInfinite, { SWRInfiniteHook } from 'swr/infinite'

const withArgs = <SWRType>(hook: any) => {
  return function (...args: any) {
    const [key, fn, _config] = args
    const config = {
      use: [swrErrorHandleMiddleware],
      revalidateOnFocus: false,
      ..._config
    }
    return hook(key, fn, config)
  } as unknown as SWRType
}

const useCustomSWR = withArgs<SWRInfiniteHook>(useSWRInfinite)

export default useCustomSWR
