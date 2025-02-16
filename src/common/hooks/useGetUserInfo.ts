'use client'
import useSWR from 'swr'
import { getUserInfoApi, getUserInfoApiUrl } from '@/common/api'
import logger from '@/common/utils/logger'
import { UserInfo } from '@/common/interface/user'

export default function useGetUserInfo() {
  const { data, error, isLoading } = useSWR(getUserInfoApiUrl, getUserInfoApi)
  if (error) logger.error(error)
  return {
    data: data?.data as UserInfo | undefined,
    isLoading
  }
}
