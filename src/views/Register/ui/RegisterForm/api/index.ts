import { post } from '@/common/utils/ajax'

export const getCaptchaApiUrl = '/api/captcha'
export function getCaptchaApi() {
  return post<{
    key: string
    data: string
  }>(getCaptchaApiUrl)
}

export interface RegisterApiProps extends Record<string, string> {
  username: string
  password: string
  captchaKey: string
  captchaVal: string
}
export const registerApiUrl = '/api/user/register-admin'
export async function registerApi(props: RegisterApiProps) {
  return await post<Record<string, never>>(registerApiUrl, props)
}
export async function registerApiMutation(url: string, { arg }: { arg: RegisterApiProps }) {
  return await registerApi(arg)
}
