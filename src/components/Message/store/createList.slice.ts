import { SWRResponse } from 'swr'
import { StateCreator } from 'zustand'
import extend from 'just-extend'
import { Message } from '@/common/types/message'
import type { MergeState } from './index'

export interface ListState {
  curPage: number
  pageSize: number | null
  total: number | null
  list: Message[]
  mutateList: SWRResponse['mutate'] | null
  setCurPage: (curPage: number) => void
  setPageSize: (pageSize: number) => void
  setTotal: (total: number) => void
  setList: (list: Message[]) => void
  setMutateList: (mutate: SWRResponse['mutate']) => void
  mergeList: (item: Partial<Message>) => void
  deleteList: (id?: string) => void
}

export const createListSlice: StateCreator<MergeState, [], [], ListState> = (set) => ({
  curPage: 1,
  pageSize: null,
  total: null,
  list: [],
  mutateList: null,
  setCurPage: (curPage) => set(() => ({ curPage })),
  setPageSize: (pageSize) => set(() => ({ pageSize })),
  setTotal: (total) => set(() => ({ total })),
  setList: (list) => set(() => ({ list })),
  setMutateList: (mutate) => set(() => ({ mutateList: mutate })),
  fetchNextPage: async () => {},
  mergeList: (item) =>
    set((state) => {
      const { list } = state
      const index = list.findIndex((message) => message.id === item.id)
      list[index] = extend(true, list[index], item) as Message
      return { list }
    }),
  deleteList: (id) =>
    set((state) => {
      let _list: Message[] = []
      if (id) {
        _list = state.list.filter((item) => item.id !== id)
      }
      return { list: _list }
    })
})
