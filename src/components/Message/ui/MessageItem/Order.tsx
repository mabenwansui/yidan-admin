import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import useGetOrderInfo from '@/common/hooks/useGetOrderInfo'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Image from '@/components/Image'
import useStore from '../../store'

interface Props {
  orderId: string
}

export default function Order(props: Props) {
  const { orderId } = props
  const { data } = useGetOrderInfo(orderId)
  const router = useRouter()
  const setOpen = useStore((state) => state.setOpen)
  const handleView = () => {
    location.href = `${ROUTE_PATH.ORDER_DETAILS}/${orderId}`
    // router.push(`${ROUTE_PATH.ORDER_DETAILS}/${orderId}`)
    setOpen(false)
  }
  return (
    <div className="relative flex items-center">
      <div className="*:[dl]:flex *:[dl]:mb-1.5 **:[dt]:w-14 **:[dt]:shrink-0 **:[dt]:text-right **:[dd]:ml-3 flex-1">
        <dl>
          <dt>编号</dt>
          <dd>{data?.orderId}</dd>
        </dl>
        <dl>
          <dt>商品</dt>
          <dd className="min-h-23">
            <ul className="flex flex-wrap">
              {data?.commoditys.map((item) => {
                return (
                  <li className="mr-2 w-24 text-center mb-2" key={item.branch.id}>
                    <div className="flex justify-center">
                      <Image src={item.branch.commodity?.coverImageUrl} alt={item.branch.commodity?.name} />
                    </div>
                    <div className="text-xs">
                      {item.branch.commodity?.name} × <span className="text-primary">{item.quantity}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </dd>
        </dl>
      </div>
      <aside className="shrink-0 p-4">
        <Button onClick={handleView}>查看</Button>
        <div className="pt-2">
          金额 <span className="font-bold text-base">{data?.actualAmount}</span>
        </div>
      </aside>
    </div>
  )
}
