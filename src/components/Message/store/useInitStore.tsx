import { useEffect } from 'react'
import useSSE from '@/common/hooks/useAjax/useSSE'
import { useSystemList } from '../hooks/useList'
import useUnRead from '../hooks/useUnRead'
import useStore from './index'

export default function useInitStore(shouldFetch: boolean) {
  const { total, mutate: unReadMutate } = useUnRead()
  const { list, mutate: listMutate } = useSystemList({ pageSize: 15 }, shouldFetch)
  const [receiveMessage] = useSSE()
  const setList = useStore((state) => state.setList)
  const setMutateList = useStore((state) => state.setMutateList)
  const setRefreshUnReadTotal = useStore((state) => state.setRefreshUnReadTotal)
  const setUnReadTotal = useStore((state) => state.setUnReadTotal)
  const setReceiveMessage = useStore((state) => state.setReceiveMessage)
  useEffect(() => {
    if (list) setList(list)
  }, [list, setList])
  useEffect(() => {
    setMutateList(listMutate)
  }, [setMutateList, listMutate])
  useEffect(() => {
    if (receiveMessage) setReceiveMessage(receiveMessage)
  }, [receiveMessage, setReceiveMessage])
  useEffect(() => {
    if (total !== undefined) setUnReadTotal(total)
    setRefreshUnReadTotal(() => unReadMutate())
  }, [total, setRefreshUnReadTotal, setUnReadTotal, unReadMutate])
}
