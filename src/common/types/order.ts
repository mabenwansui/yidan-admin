import type { Store } from './store'
import type { Branch } from './branch'

export const ORDER_TYPE = {
  DINE_IN: 'dine-in',
  TAKE_OUT: 'takeout',
  DELIVERY: 'delivery'
} as const
export type ORDER_TYPE = ValueOf<typeof ORDER_TYPE>
export const ORDER_TYPE_MAPPING = {
  [ORDER_TYPE.DINE_IN]: '堂食',
  [ORDER_TYPE.TAKE_OUT]: '外卖',
  [ORDER_TYPE.DELIVERY]: '配送'
} as const

export const ORDER_STATUS = {
  /** 待支付 */
  PENDING: 'pending',
  /** 用户已支付，等待商家接单 */
  PAID: 'paid',
  /** 商家已确认并开始准备 */
  ACCEPTED: 'accepted',
  /** 处理中 */
  PROCESSING: 'processing',
  /** 待取餐 */
  READY: 'ready',
  /** 已取消 */
  CANCELLED: 'cancelled',
  /** 申请退款 */
  REFUND_REQUESTED: 'refund_requested',
  /** 退款中 */
  REFUNDING: 'refunding',
  /** 退款失败 */
  REFUND_FAILED: 'refund_failed',
  /** 退款完成 */
  REFUNDED: 'refunded',
  /** 已完成 */
  COMPLETED: 'completed'
} as const
export type ORDER_STATUS = ValueOf<typeof ORDER_STATUS>
export const ORDER_STATUS_MAPPING = {
  [ORDER_STATUS.PENDING]: '待支付',
  [ORDER_STATUS.PAID]: '已支付',
  [ORDER_STATUS.ACCEPTED]: '已接单',
  [ORDER_STATUS.PROCESSING]: '处理中',
  [ORDER_STATUS.READY]: '待取餐',
  [ORDER_STATUS.CANCELLED]: '已取消',
  [ORDER_STATUS.REFUND_REQUESTED]: '申请退款',
  [ORDER_STATUS.REFUNDING]: '退款中',
  [ORDER_STATUS.REFUND_FAILED]: '退款失败',
  [ORDER_STATUS.REFUNDED]: '退款完成',
  [ORDER_STATUS.COMPLETED]: '已完成'
} as const

export const PAYMENT_TYPE = {
  /** 微信支付 */
  WECHAT: 'wechat',
  /** 支付宝支付 */
  ALIPAY: 'alipay'
} as const
export type PAYMENT_TYPE = ValueOf<typeof PAYMENT_TYPE> // 定义支付类型的类型别名，使用 ValueOf 函数获取枚举类型的所有值，并使用 as const 确保值是常量，这样 TypeScript 就可以正确推断类型了。
export const PAYMENT_TYPE_MAPPING = {
  [PAYMENT_TYPE.WECHAT]: '微信支付',
  [PAYMENT_TYPE.ALIPAY]: '支付宝支付'
} as const

export const PAYMENT_STATUS = {
  /** 未支付 */
  UNPAID: 'unpaid',
  /** 已支付 */
  PAID: 'paid',
  /** 支付失败 */
  FAILED: 'failed'
} as const
export type PAYMENT_STATUS = ValueOf<typeof PAYMENT_STATUS>
export const PAYMENT_STATUS_MAPPING = {
  [PAYMENT_STATUS.UNPAID]: '未支付',
  [PAYMENT_STATUS.PAID]: '已支付',
  [PAYMENT_STATUS.FAILED]: '支付失败'
}

export interface Commodity {
  branch: Branch
  quantity: number
}

export interface Order {
  id: string // 订单ID
  orderId?: string // 订单编号
  store: Store // 店铺信息
  orderType: ORDER_TYPE // 订单类型
  orderStatus?: ORDER_STATUS // 订单状态
  paymentType: PAYMENT_TYPE // 支付类型
  paymentStatus?: PAYMENT_STATUS // 支付状态
  originalAmount: number // 原价
  actualAmount: number // 实际支付金额
  tableNumber?: string // 桌号
  remark?: string
  commoditys: Commodity[]
  payAt?: Date // 支付时间
  completedAt?: Date
}
