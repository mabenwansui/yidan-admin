import { User } from '@/common/types/user'
import { AddressLocationSelect } from '@/common/types/address'

export interface Base {
  id: string
  name: string
  imgNames?: string[]
  coverImageUrl?: string
  description?: string
  details?: string
  owner?: User[]
  open?: boolean
  openFormat?: string // ajax获取数据后格式化
  ownerFormat?: string
}

export type Store = Base & AddressLocationSelect

export interface StoreForm extends Omit<Base, 'owner'> {
  owner?: string[]
  addressLocation: AddressLocationSelect
}
