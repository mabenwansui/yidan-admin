import { post } from '@/common/utils/ajax'

export function getCaptchaApi() {
  return post<{
    key: string
    data: string
  }>('/api/captcha')
}

export interface RegisterApiProps extends Record<string, string> {
  username: string
  password: string
  captchaKey: string
  captchaVal: string
}
export async function registerApi(props: RegisterApiProps) {
  return await post<Record<string, never>>('/api/user/register-admin', props)
}
