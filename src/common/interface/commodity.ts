export interface Commodity {
  name: string // 名称
  id: string // 商品ID
  tags?: [string] // 标签
  originalPrice?: number // 原价
  price: number // 现价
  description?: string // 描述
  category?: string // 分类
  details?: string // 详情
  imgNames?: [string] // 图片
  stockConunt?: number // 库存
  soldCount?: number // 已售
  createdAt?: Date // 创建时间
  updatedAt?: Date // 更新时间
}
