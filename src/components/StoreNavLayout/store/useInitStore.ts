import { useEffect } from 'react'
import useGetStoreList from '@/common/hooks/useGetStoreList'
import { useParams } from 'next/navigation'
import useStore from './index'

export default function useInitStore() {
  const params = useParams<{ id: string }>()
  const { list } = useGetStoreList()
  const setList = useStore((state) => state.setList)
  const setCurStore = useStore((state) => state.setCurStore)
  useEffect(() => setCurStore(params.id), [params.id, setCurStore])
  useEffect(() => {
    if (list?.length) {
      setList(list)
    }
  }, [list, setList])
}
