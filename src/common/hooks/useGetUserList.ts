import { useState } from 'react'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { User } from '@/common/types/user'
import { ROLE } from '@/common/constants/role'

export type SelectRoleType = ROLE.ADMIN | ROLE.STAFF

export interface Search {
  username?: string
  nickname?: string
  role?: SelectRoleType[] | null
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

export const searchUrl = '/api/user/superadmin/search'
export const staffUrl = '/api/user/search'
const empty: User[] = []

function useGetListFn(url: string, params: Search = {}) {
  const [username, setUsername] = useState(params.username)
  const [nickname, setNickname] = useState(params.nickname)
  const [role, setRole] = useState<SelectRoleType[] | undefined | null>(params.role)
  const [index, setIndex] = useState(0)
  const [curPage, setCurPage] = useState(params.curPage || 1)
  const [pageSize, setPageSize] = useState(params.pageSize || 100)
  const fetcher = async ({ args }: ArgsParams) => await post<Response>(url, args)
  const { data, isLoading } = useSWR(
    {
      url: `${url}${index}`,
      args: {
        username,
        nickname,
        role: role,
        curPage,
        pageSize
      }
    },
    fetcher,
    { keepPreviousData: true }
  )

  const refresh = (params: Search) => {
    const { username, nickname, role, curPage, pageSize } = params
    if (username !== undefined) setUsername(username)
    if (nickname !== undefined) setNickname(nickname)
    if (pageSize !== undefined) setPageSize(pageSize)
    if (role !== undefined) setRole(role)
    if (curPage !== undefined) setCurPage(curPage)
    setIndex(index + 1)
  }

  const response = {
    index,
    curPage,
    pageSize,
    total: data?.data?.total || 0,
    list: data?.data?.list || empty, // empty需要是一个引用类型
    refresh,
    isLoading
  }
  // 当访问一个不存在的页面时, 自动跳转到第一页
  if (curPage > 1 && isLoading === false && data?.data?.list?.length === 0) {
    refresh({ curPage: 1 })
    response.isLoading = false
  }
  return response
}

/** 超管身份获取列表 */
export function useGetListSuperAdmin(params: Search = {}) {
  return useGetListFn(searchUrl, params)
}

/** 管理员身份获取列表，只能看到自己权限范围的人 */
export function useGetStaffList(params: Search = {}) {
  return useGetListFn(staffUrl, params)
}
