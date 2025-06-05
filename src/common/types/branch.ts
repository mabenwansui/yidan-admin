import { Store } from '@/common/types/store'
import { Commodity } from '@/common/types/commodity'

interface Base {
  stockConunt?: number // 库存
  soldCount?: number // 已售
  originalPrice?: number // 原价
  price?: number // 现价
  isOnShelf?: boolean // 上架
}

export interface Branch extends Base {
  id: string
  store?: Store
  commodity?: Commodity
}

export interface BranchForm extends Base {
  id?: string
  storeId: string
  commodity?: {
    value: string
    label: string
  }
}
