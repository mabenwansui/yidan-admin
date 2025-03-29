import { post } from '@/common/utils/ajax'

export interface CreateCommodityProps {
  name: string // 商品名称
  tags?: [string] // 商品标签
  originalPrice?: number // 商品原价
  price: number // 商品现价
  description?: string // 商品描述
  category?: string // 商品分类
  details?: string // 商品详情
  imgNames?: [string] // 商品图片
  stockConunt?: number // 商品库存
  soldCount?: number // 已售
}

export const createCommodityApiUrl = '/api/commodity/create'
export async function createCommodityApi(props: CreateCommodityProps) {
  return await post<Record<string, never>>(createCommodityApiUrl, props)
}
export async function createCommodityApiMutation(url: string, { arg }: { arg: CreateCommodityProps }) {
  return await createCommodityApi(arg)
}

export async function maben() {
  return await post('/api/commodity/get-info', { id: '67dae985e7901cb84c08ab6c' })
}
