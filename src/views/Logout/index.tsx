'use client'
import { useEffect } from 'react'
import { post } from '@/common/utils/ajax'
import { ROUTE_PATH } from '@/common/constants/routePath'

export default function Logout() {
  useEffect(() => {
    async function fetcher() {
      await post('/api/auth/logout')
      window.location.href = ROUTE_PATH.LOGIN
    }
    fetcher()
  })
  return null
}
