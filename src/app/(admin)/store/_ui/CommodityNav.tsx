import Icon from '@/components/Icons'
import { useGetStoreList } from '../_hooks/useGetStoreList'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { useRouter, useParams } from 'next/navigation'

export default function CommodityNav() {
  const { list } = useGetStoreList()
  const params = useParams()
  const router = useRouter()
  const handleClick = (id: string) => router.push(`${ROUTE_PATH.STORE_COMMODITY}/${id}`)
  return (
    <div className="bg-white rounded-lg w-full border border-border">
      <div className="flex border-b-1 border-border p-4 items-center">
        <Icon name="store" className="mr-2" />
        <span className="font-bold">店铺</span>
      </div>
      <div className="pt-2 pb-2">
        <ul
          className="
          *:hover:bg-gray-50
            *:p-4 
            *:truncate
            *:pt-2 
            *:pb-2 
            *:cursor-pointer
            [&_.active]:bg-primary-light!
            [&_.active]:text-link!
          "
        >
          {list?.map((store) => (
            <li key={store.id} onClick={() => handleClick(store.id)} className={store.id === params.id ? 'active' : ''}>
              {store.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
