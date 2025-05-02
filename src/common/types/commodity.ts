import { Category } from './category'
export interface Commodity {
  id: string // 商品ID
  name: string // 名称
  tags?: [string] // 标签
  originalPrice?: number // 原价
  price: number // 现价
  description?: string // 描述
  category?: Category // 分类
  details?: string // 详情
  imgNames?: string[] // 图片
  coverImageUrl: string // 封面图
  stockConunt?: number // 库存
  soldCount?: number // 已售
  createdAt?: Date // 创建时间
  updatedAt?: Date // 更新时间
}
