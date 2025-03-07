import { create } from 'zustand'
import { TreeDataNode } from 'antd'
import Item from '../ui/Item'

interface RequestItem {
  id: string
  title: string
  children: RequestItem[]
}

interface CommodityCategoryStore {
  list: TreeDataNode[]
  init: (data: RequestItem[]) => void
  update?: (id: string) => void
}

const useStore = create<CommodityCategoryStore>((set) => ({
  list: [],
  init: (data: RequestItem[]) => {
    const fn = (data: RequestItem[]) => {
      return data.map((item) => {
        const treeData: TreeDataNode = {
          title: <Item id={item.id}>{item.title}</Item>,
          key: item.id
        }
        if (item?.children?.length > 0) {
          treeData.children = fn(item.children)
        }
        return treeData
      })
    }
    set(() => ({ list: fn(data) }))
  }
}))

export default useStore
