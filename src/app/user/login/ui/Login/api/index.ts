import { post } from '@/common/utils/ajax'

interface LoginApiProps {
  username: string
  password: string
}
export async function loginApi(props: LoginApiProps) {
  const { username, password } = props
  return await post('/api/auth/login', {
    username,
    password
  })
}

// import { useAjaxTrigger } from '@/common/hooks/useAjax'
// export function useLogin() {
//   const { isLoading, trigger } = useAjaxTrigger<{ accessToken: string }>('/api/auth/login')
//   return {
//     trigger: async (params: LoginParams) => {
//       const { username, password } = params
//       return await trigger({ username, password })
//     },
//     isLoading,
//   }
// }
