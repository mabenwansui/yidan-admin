export interface Commodity {
  /** 项目名称，必须且唯一 */
  name: string
  /** 项目负责人，存储用户的 ObjectId 数组 */
  owner?: string[]
  /** 图片名称数组，可选字段 */
  imgNames?: string[]
  /** 封面图片的 URL，可选字段 */
  coverImageUrl?: string
  /** 项目描述，可选字段 */
  description?: string
  /** 项目所在城市，可选字段 */
  city?: string
  /** 项目地址，可选字段 */
  address?: string
  /** 项目地理位置，包含纬度和经度，可选字段 */
  location?: {
    lat: number
    lng: number
  }
}
