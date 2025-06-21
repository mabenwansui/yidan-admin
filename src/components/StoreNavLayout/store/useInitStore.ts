import { useEffect } from 'react'
import useGetStoreList from '@/common/hooks/useGetStoreList'
import { useParams, usePathname } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import useStore from './index'

export default function useInitStore() {
  const params = useParams<{ storeId: string }>()
  const pathname = usePathname()
  const { list } = useGetStoreList()
  const setList = useStore((state) => state.setList)
  const setCurStore = useStore((state) => state.setCurStore)
  useEffect(() => {
    if (pathname === ROUTE_PATH.ORDER_LIST) {
      setCurStore(params.storeId)
    }
  }, [params.storeId, setCurStore, pathname])
  useEffect(() => {
    if (list?.length) {
      setList(list)
    }
  }, [list, setList])
}
