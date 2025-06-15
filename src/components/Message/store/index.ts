import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { Message } from '@/common/types/message'
import extend from 'just-extend'

const useStore = create(
  combine(
    {
      unReadTotal: 0,
      list: [] as Message[]
    },
    (set, _) => {
      return {
        read: () =>
          set((state) => {
            const _t = state.unReadTotal - 1
            return { unReadTotal: Math.max(_t, 0) }
          }),
        setUnReadTotal: (newUnReadTotal: number) => set({ unReadTotal: newUnReadTotal }),
        setList: (list: Message[]) =>
          set(() => {
            return {
              list
            }
          }),
        mergeList: (item: Partial<Message>) =>
          set((state) => {
            const { list } = state
            const index = list.findIndex((message) => message.id === item.id)
            list[index] = extend(true, list[index], item) as Message
            return { list }
          }),
        receiveNew: (newMessage: Message) =>
          set((state) => {
            return {
              unReadTotal: state.unReadTotal + 1,
              list: [newMessage, ...state.list]
            }
          }),
        deleteList: (id?: string) =>
          set((state) => {
            let _list: Message[] = []
            if (id) {
              _list = state.list.filter((item) => item.id !== id)
            }
            return { list: _list }
          })
      }
    }
  )
)
export default useStore
