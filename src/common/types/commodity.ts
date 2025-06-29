import { Category } from './category'
export interface Commodity {
  id: string // 商品ID
  name: string // 名称
  tags?: [string] // 标签
  description?: string // 描述
  category?: Category // 分类
  details?: string // 详情
  imgNames?: string[] // 图片
  coverImageUrl: string // 封面图
  createdAt?: Date // 创建时间
  updatedAt?: Date // 更新时间
}
