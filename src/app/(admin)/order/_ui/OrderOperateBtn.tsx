import { Button, ButtonProps } from 'antd'
import cs from 'clsx'
import { Order, ORDER_STATUS } from '@/common/types/order'
interface Props {
  order?: Order
  className?: string
  buttonType?: ButtonProps
  onUpdateStage?: (orderId: string, orderStatus: ORDER_STATUS) => void
}
export default function OrderOperateBtn(props: Props) {
  const { order, onUpdateStage, className, buttonType = {} } = props
  const renderBtn = () => {
    if (!order) {
      return null
    }
    switch (order.orderStatus) {
      case ORDER_STATUS.PAID:
        return (
          <Button
            type="primary"
            className={cs(className)}
            {...buttonType}
            onClick={() => onUpdateStage?.(order.id, ORDER_STATUS.ACCEPTED)}
          >
            接单
          </Button>
        )
      case ORDER_STATUS.PROCESSING:
        return (
          <Button
            type="primary"
            {...buttonType}
            className={cs('bg-success!', className)}
            onClick={() => onUpdateStage?.(order.id, ORDER_STATUS.READY)}
          >
            出餐
          </Button>
        )
      case ORDER_STATUS.READY:
        return (
          <Button
            type="primary"
            className={cs(className)}
            {...buttonType}
            onClick={() => onUpdateStage?.(order.id, ORDER_STATUS.COMPLETED)}
          >
            完成
          </Button>
        )
      case ORDER_STATUS.COMPLETED:
        return (
          <Button
            className={cs(className)}
            {...buttonType}
            onClick={() => onUpdateStage?.(order.id, ORDER_STATUS.COMPLETED)}
          >
            归档
          </Button>
        )
    }
  }
  return renderBtn()
}
