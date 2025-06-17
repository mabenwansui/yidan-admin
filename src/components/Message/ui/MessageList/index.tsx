import { useState } from 'react'
import InfiniteScroll from '@/components/InfiniteScroll'
import useStore from '../../store/index'
import MessageItem from '../MessageItem'

export default function MessageList() {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const list = useStore((state) => state.list)
  const handleLoadMore = () => {
    setLoading(true)
    console.log('load more:::::::')
  }
  return (
    <>
      {list && (
        <InfiniteScroll isLoading={loading} hasMore={hasMore} loadMore={handleLoadMore}>
          {list.map((item) => (
            <div key={item.id}>
              <MessageItem message={item} />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}
