import React, { useState, useRef, useEffect, useCallback } from 'react'
import LoadMore from '@/components/Loading/LoadMore'

interface Props {
  /** 触发 loadMore 后会加锁，监听 dataLength 变化以解锁，避免重复触发 */
  dataLength: number
  /** 是否有下一页数据 */
  hasMore: boolean
  loadMore: () => void
  children: React.ReactNode
}
const timeout = 5000
export default function InfiniteScroll(props: Props) {
  const [loading, setLoading] = useState(false)
  const { hasMore, loadMore, children, dataLength } = props
  const observerRef = useRef<HTMLDivElement | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        if (loading === false) {
          clearTimeout(timer.current!)
          setLoading(true)
          timer.current = setTimeout(() => setLoading(false), timeout)
          loadMore()
        }
      }
    },
    [loadMore, loading]
  )
  useEffect(() => {
    const target = observerRef.current
    if (!target) return
    const observer = new IntersectionObserver(observerCallback)
    observer.observe(target)
    return () => observer.disconnect()
  }, [observerCallback])
  useEffect(() => {
    clearTimeout(timer.current!)
    setLoading(false)
  }, [dataLength])

  return (
    <>
      {children}
      {hasMore && <div ref={observerRef}>{loading && <LoadMore />}</div>}
    </>
  )
}
