import { User } from '@/common/types/user'

export enum TagType {
  REMARK = 'remark'
}

export interface Tag {
  id: string
  type: TagType
  name: string
  sort: number
  isSystem: boolean
  creator: User
}
