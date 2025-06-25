import { create } from 'zustand'
import { Store } from '@/common/types/store'

interface StoreState {
  curStore: Store | null
  list: Store[]
  setList: (list: Store[]) => void
  setCurStore: (storeId: string) => void
  clear: () => void
}

const useStore = create<StoreState>()((set) => ({
  curStore: null,
  list: [],
  setCurStore: (storeId) => set((state) => ({ curStore: state.list.find((item) => item.id === storeId) })),
  setList: (list) => set(() => ({ list })),
  clear: () => set(() => ({ curStore: null, list: [] }))
}))

export default useStore
