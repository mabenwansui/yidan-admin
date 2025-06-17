import { Message } from '@/common/types/message'
import { StateCreator } from 'zustand'
import type { MergeState } from './index'

export interface StatusState {
  unReadTotal: number
  receiveMessage: Message | null
  refreshUnReadTotal: () => void
  read: (messageId?: string) => void
  setUnReadTotal: (newTotal: number) => void
  setRefreshUnReadTotal: (refreshFn: any) => void
  setReceiveMessage: (newMessage: Message) => void
}

export const createStatusSlice: StateCreator<MergeState, [], [], StatusState> = (set) => ({
  unReadTotal: 0,
  receiveMessage: null,
  refreshUnReadTotal: () => {},
  read: (messageId?: string) =>
    set((state) => {
      if (messageId) {
        state.mergeList({
          id: messageId,
          isRead: true
        })
        const _t = state.unReadTotal - 1
        return { unReadTotal: Math.max(_t, 0) }
      } else {
        const _list = state.list.map((item) => {
          return { ...item, isRead: true }
        })
        return { list: _list, unReadTotal: 0 }
      }
    }),
  setUnReadTotal: (newTotal) => set(() => ({ unReadTotal: newTotal })),
  setRefreshUnReadTotal: (fn) => set(() => ({ refreshUnReadTotal: fn })),
  setReceiveMessage: (newMessage: Message) =>
    set((state) => ({
      receiveMessage: newMessage,
      unReadTotal: state.unReadTotal + 1,
      list: [newMessage, ...state.list]
    }))
})
