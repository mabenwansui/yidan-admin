export interface Store {
  id: string
  name: string
  owner?: string[]
  imgNames?: string[]
  coverImageUrl?: string
  description?: string
  city?: string
  address?: string
  open?: boolean
}
