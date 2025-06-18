import { create } from 'zustand'
import { createListSlice } from './createList.slice'
import { createStatusSlice } from './createStatus.slice'
import type { ListState } from './createList.slice'
import type { StatusState } from './createStatus.slice'

export type MergeState = ListState & StatusState

const useStore = create<MergeState>()((...args) => ({
  ...createListSlice(...args),
  ...createStatusSlice(...args)
}))

export default useStore
