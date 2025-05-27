import { User } from '@/common/types/user'
import { AddressLocationSelect } from '@/common/types/address'

export interface Base {
  id: string
  name: string
  owner?: User[]
  imgNames?: string[]
  coverImageUrl?: string
  description?: string
  details?: string
  open?: boolean
}

export type Store = Base & AddressLocationSelect

export interface StoreForm extends Omit<Base, 'owner'> {
  owner?: string[]
  addressLocation: AddressLocationSelect
}
