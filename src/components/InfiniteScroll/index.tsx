import React, { useRef, useEffect, useCallback } from 'react'
import LoadMore from '@/components/Loading/LoadMore'

interface Props {
  /** 是否有下一页数据 */
  hasMore: boolean
  /** 当处于loading状态时, 不会再次触发loadMore */
  isLoading: boolean
  loadMore: () => void
  children: React.ReactNode
}

export default function InfiniteScroll(props: Props) {
  const { hasMore, loadMore, isLoading, children } = props
  const observerRef = useRef<HTMLDivElement | null>(null)

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        if (isLoading === false) loadMore()
      }
    },
    [loadMore, isLoading]
  )
  useEffect(() => {
    const target = observerRef.current
    if (!target) return
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px 200px 0px'
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [observerCallback])

  return (
    <>
      {children}
      {hasMore && <div ref={observerRef}>{isLoading && <LoadMore />}</div>}
    </>
  )
}
