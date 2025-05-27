import { Store } from '@/common/types/store'
import { Commodity } from '@/common/types/commodity'

interface Base {
  id?: string
  stockConunt?: number // 库存
  soldCount?: number // 已售
  price?: number // 现价
  isOnShelf?: boolean // 上架
}

export interface Branch extends Base {
  store?: Store
  commodity?: Commodity
}

export interface BranchForm extends Base {
  storeId: string
  commodityId?: string
}
