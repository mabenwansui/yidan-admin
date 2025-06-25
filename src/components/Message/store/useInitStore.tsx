import { useEffect } from 'react'
import useSSE from '@/common/hooks/useAjax/useSSE'
import useInfinitelist from '../hooks/useInfinitelist'
import useGetUnReadTotal from '../hooks/useGetUnReadTotal'
import useStore from './index'

export default function useInitStore() {
  const { total } = useGetUnReadTotal()
  const open = useStore((state) => state.open)
  const appendList = useStore((state) => state.appendList)
  const setLoadMore = useStore((state) => state.setLoadMore)
  const setRefreshUnReadTotal = useStore((state) => state.setRefreshUnReadTotal)
  const setUnReadTotal = useStore((state) => state.setUnReadTotal)
  const setReceiveMessage = useStore((state) => state.setReceiveMessage)
  const { data, size, setSize } = useInfinitelist({}, open)
  const [receiveMessage] = useSSE()
  useEffect(() => {
    if (data) {
      const curData = data[data.length - 1].data
      const _list = curData.list
      if (!_list || _list.length === 0) return
      appendList(curData)
    }
  }, [data, appendList])
  useEffect(() => {
    setLoadMore(() => setSize(size + 1))
  }, [setLoadMore, setSize, size])
  useEffect(() => {
    if (receiveMessage) setReceiveMessage(receiveMessage)
  }, [receiveMessage, setReceiveMessage])
  useEffect(() => {
    if (total !== undefined) setUnReadTotal(total)
  }, [total, setRefreshUnReadTotal, setUnReadTotal])
}
