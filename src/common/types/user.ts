import { ROLE } from '@/common/constants/role'
export interface UserBase {
  id: string // 用户ID
  username: string // 用户名
  nickname?: string // 昵称
  email?: string // 邮箱
  phoneNumber?: string // 手机号
}

export interface AllUser extends UserBase {
  role: ROLE[]
}

export interface AdminUser extends UserBase {
  role: (ROLE.ADMIN | ROLE.STAFF)[]
}

export interface User extends UserBase {
  role: ROLE.USER[]
}
