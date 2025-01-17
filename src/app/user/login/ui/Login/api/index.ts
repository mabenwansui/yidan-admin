import { useAjaxTrigger } from '@/common/hooks/useAjax'

interface LoginParams {
  username: string
  password: string
}
export function useLogin() {
  const { isLoading, trigger } = useAjaxTrigger<{ accessToken: string }>('/api/auth/login')
  return {
    trigger: async (params: LoginParams) => {
      const { username, password } = params
      return await trigger({ username, password })
    },
    isLoading,
  }
}
