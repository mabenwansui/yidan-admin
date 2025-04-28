import { Store } from '@/common/types/store'
import { Commodity } from '@/common/types/commodity'

export interface Branch {
  id?: string
  storeId?: string
  commodityId?: string
  store?: Store
  commodity?: Commodity
  stockConunt?: number // 库存
  soldCount?: number // 已售
  price?: number // 现价
  isOnShelf?: boolean // 上架
}
