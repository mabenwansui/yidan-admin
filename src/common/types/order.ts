import type { Store } from './store'
import type { Branch } from './branch'

export const ORDER_TYPE = {
  /** 堂食 */
  DINE_IN: 'dine-in',
  /** 外卖 */
  TAKE_OUT: 'takeout',
  /** 配送 */
  DELIVERY: 'delivery'
} as const
export type ORDER_TYPE = ValueOf<typeof ORDER_TYPE>

export const ORDER_STATUS = {
  /** 待支付 */
  PENDING: 'pending',
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

export const PAYMENT_TYPE = {
  /** 微信支付 */
  WECHAT: 'wechat',
  /** 支付宝支付 */
  ALIPAY: 'alipay'
} as const
export type PAYMENT_TYPE = ValueOf<typeof PAYMENT_TYPE> // 定义支付类型的类型别名，使用 ValueOf 函数获取枚举类型的所有值，并使用 as const 确保值是常量，这样 TypeScript 就可以正确推断类型了。

export const PAYMENT_STATUS = {
  /** 未支付 */
  UNPAID: 'unpaid',
  /** 已支付 */
  PAID: 'paid',
  /** 支付失败 */
  FAILED: 'failed'
} as const
export type PAYMENT_STATUS = ValueOf<typeof PAYMENT_STATUS>

export interface Order {
  id?: string // 订单ID
  orderId?: string // 订单编号
  store: Store // 店铺信息
  orderType: ORDER_TYPE // 订单类型
  orderStatus?: ORDER_STATUS // 订单状态
  paymentType: PAYMENT_TYPE // 支付类型
  paymentStatus?: PAYMENT_STATUS // 支付状态
  originalAmount: number // 原价
  actualAmount: number // 实际支付金额
  table_number?: string // 桌号
  remark?: string
  commoditys: { branch: Branch; quantity: number }[]
  completedAt?: Date
}
