import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { User } from '@/common/types/user'
import { ROLE } from '@/common/constants/role'

export type SelectRoleType = ROLE.ADMIN | ROLE.STAFF | 'all'

export interface Search {
  username?: string
  nickname?: string
  role?: SelectRoleType[]
  curPage?: number
  pageSize?: number
}

interface Response {
  list: Array<User>
  pageSize: number
  curPage: number
  total: number
}

interface ArgsParams {
  url: string
  args: Search
}

export const url = '/api/user/search-admin'
export const staffUrl = '/api/user/search-staff'
// const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)
const empty: User[] = []
export default function useListSearch(params: Search = {}, type: 'admin' | 'staff' = 'admin') {
  const [username, setUsername] = useState(params.username)
  const [nickname, setNickname] = useState(params.nickname)
  const [role, setRole] = useState<SelectRoleType[] | undefined | null>(params.role)
  const [index, setIndex] = useState(0)
  const [curPage, setCurPage] = useState(params.curPage || 1)
  const [pageSize] = useState(params.pageSize || 100)
  const _url = type === 'admin' ? url : staffUrl
  const fetcher = async ({ args }: ArgsParams) => await post<Response>(_url, args)
  const { data, isLoading } = useSWR(
    {
      url: `${_url}${index}`,
      args: {
        username,
        nickname,
        role,
        curPage,
        pageSize
      }
    },
    fetcher,
    { keepPreviousData: true }
  )

  const filter = (params: { username?: string; nickname?: string; role?: SelectRoleType }) => {
    const { username, nickname, role } = params
    if (username) setUsername(username)
    if (nickname) setNickname(nickname)
    if (role) {
      if (role === 'all') {
        setRole(null)
      } else {
        setRole([role])
      }
    }
    setCurPage(1)
    setIndex(index + 1)
  }

  const refresh = (curPage: number) => {
    setCurPage(curPage)
    setIndex(index + 1)
  }

  const response = {
    index,
    curPage,
    pageSize,
    total: data?.data?.total || 0,
    list: data?.data?.list || empty, // empty需要是一个引用类型
    filter,
    refresh,
    isLoading
  }
  if (index > 0 && isLoading === false && data?.data?.list?.length === 0) {
    refresh(1)
    response.isLoading = false
  }
  return response
}
