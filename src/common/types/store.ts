import { City } from './city'
import { User } from '@/common/types/user'

export interface Store {
  id: string
  name: string
  owner?: User[]
  imgNames?: string[]
  coverImageUrl?: string
  description?: string
  city?: City
  address?: string
  open?: boolean
}
