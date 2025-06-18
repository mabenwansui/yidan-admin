import { Empty } from 'antd'
import InfiniteScroll from '@/components/InfiniteScroll'
import useStore from '../../store'
import MessageItem from '../MessageItem'

export default function MessageList() {
  const list = useStore((state) => state.list)
  const loadMore = useStore((state) => state.loadMore)
  const hasMore = useStore((state) => state.hasMore)
  const handleLoadMore = () => loadMore()
  console.log('list:::::::::', list)
  const render = () => {
    if (!list) return null
    if (list.length === 0) {
      return (
        <div className="p-20">
          <Empty description="没有数据" />
        </div>
      )
    }
    return (
      <InfiniteScroll dataLength={list.length} hasMore={hasMore} loadMore={handleLoadMore}>
        {list.map((item) => (
          <div key={item.id}>
            <MessageItem message={item} />
          </div>
        ))}
      </InfiniteScroll>
    )
  }
  return <>{render()}</>
}
