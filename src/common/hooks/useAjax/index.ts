import { useEffect, useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { ERROR_CODE } from '@/common/constants/errorCode'
import { isLogin } from '@/common/utils/env'
import useSWRMutation from 'swr/mutation'
import { request, ObjectType } from '../../utils/ajax/request'
import logger from '@/common/utils/logger'
import { App } from 'antd'
import { refreshTokenApi } from '@/common/api'

interface Fetcher {
  url: string
  params: Record<string, string>
}

export function usePost<T extends ObjectType>(
  url: string,
  params: object | FormData = {},
  options: SWRConfiguration = {}
) {
  const { message } = App.useApp()
  const { code, setCode } = useState()
  const { msg, setMsg } = useState()
  const { data, error, isLoading } = useSWR(
    {
      url,
      params
    },
    ({ url, params }: Fetcher) => request<T>({ url, method: 'post', data: params }),
    options
  )
  useEffect(() => {
    async function message() {
      switch (code) {
        case ERROR_CODE.AUTH_CHECK_FAILED: {
          if (await isLogin()) {
            const { flag, data } = await request<{ status: 'ok' }>({ url: '/api/auth/refresh-auth', method: 'post' })
            if (flag === 1) {
              return await request<T>({ url, method: 'post', data: params })
            }
            // const { flag: _flag } = await refreshTokenApi()
            // if (_flag === 1) {
            //   return await request<T>({ url, method: 'post', data: params })
            // }
          }
          break
        }
      }
    }
    message()
  }, [code, msg])

  if (error) logger.error(error)
  if (data?.flag === 0) {
    if (data?.msg) message.error(data.msg)
  }
  return {
    data: data?.data,
    isLoading
  }
}
