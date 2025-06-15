import { Button } from 'antd'
import useGetOrderInfo from '@/common/hooks/useGetOrderInfo'
import { useRouter } from 'next/navigation'
import Image from '@/components/Image'

interface Props {
  orderId: string
}

export default function Order(props: Props) {
  const { orderId } = props
  const { data } = useGetOrderInfo(orderId)
  const router = useRouter()
  const handleView = () => {
    router.push('/')
  }
  return (
    data && (
      <div className="relative flex items-center">
        <div className="*:[dl]:flex *:[dl]:mb-1.5 **:[dt]:w-14 **:[dt]:shrink-0 **:[dt]:text-right **:[dd]:ml-3 flex-1">
          <dl>
            <dt>编号</dt>
            <dd>{data.orderId}</dd>
          </dl>
          <dl>
            <dt>商品</dt>
            <dd>
              <ul className="flex flex-wrap">
                {data.commoditys.map((item) => {
                  return (
                    <li className="mr-2 w-24 text-center mb-2" key={item.branch.id}>
                      <div className="flex justify-center">
                        <Image
                          imgUrl={item.branch.commodity?.coverImageUrl}
                          alt={item.branch.commodity?.name}
                          size="small"
                        />
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
          <div className="pt-1.5">
            金额 <span className="text-error font-bold text-base">{data.actualAmount}</span>
          </div>
        </aside>
      </div>
    )
  )
}
