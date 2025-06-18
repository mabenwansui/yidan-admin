import { StateCreator } from 'zustand'
import extend from 'just-extend'
import { Page } from '@/common/types/page'
import { Message } from '@/common/types/message'
import type { MergeState } from './index'

export interface ListState {
  curPage: number
  pageSize: number | null
  total: number | null
  list: Message[]
  hasMore: boolean
  loadMore: () => void
  setCurPage: (curPage: number) => void
  setPageSize: (pageSize: number) => void
  setTotal: (total: number) => void
  setLoadMore: (fn: any) => void
  computeHasMore: (curPage: number, total: number) => void
  appendList: (data: { list: Message[] } & Page) => void
  mergeList: (item: Partial<Message>) => void
  deleteList: (id?: string) => void
}

export const createListSlice: StateCreator<MergeState, [], [], ListState> = (set) => ({
  curPage: 1,
  pageSize: 20,
  total: null,
  list: [],
  hasMore: true,
  loadMore: () => {},
  setCurPage: (curPage) => set(() => ({ curPage })),
  setPageSize: (pageSize) => set(() => ({ pageSize })),
  setTotal: (total) => set(() => ({ total })),
  setLoadMore: (fn) => set(() => ({ loadMore: fn })),
  computeHasMore: (curPage, total) => set((state) => ({ hasMore: curPage! * state.pageSize! < total })),
  appendList: (data) =>
    set((state) => {
      if (state.list.find((item) => item.id === data.list[0].id)) return {}
      const curPage = state.curPage + 1
      state.computeHasMore(curPage, data.total!)
      return {
        curPage,
        pageSize: data.pageSize,
        total: data.total,
        list: [...state.list, ...data.list]
      }
    }),
  mergeList: (item) =>
    set((state) => {
      const { list } = state
      const index = list.findIndex((message) => message.id === item.id)
      list[index] = extend(true, list[index], item) as Message
      return { list }
    }),
  deleteList: (id) =>
    set((state) => {
      let _list: Message[]
      if (id) {
        _list = state.list.filter((item) => {
          if (item.id === id) {
            if (item.isRead === false) state.setUnReadTotal(state.unReadTotal! - 1)
            return false
          }
          return true
        })
      } else {
        _list = state.list.filter((item) => item.isRead === false)
      }
      return { list: _list }
    })
})
