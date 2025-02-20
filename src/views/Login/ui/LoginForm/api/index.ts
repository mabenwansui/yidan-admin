import { post } from '@/common/utils/ajax'

export interface LoginApiProps {
  username: string
  password: string
}
export const loginApiUrl = '/api/auth/login'
export async function loginApi(props: LoginApiProps) {
  return await post(loginApiUrl, props)
}
export async function loginApiMutation(url: string, { arg }: { arg: LoginApiProps }) {
  return await loginApi(arg)
}
