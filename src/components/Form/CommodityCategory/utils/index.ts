import { ListItem } from '../ui/Tree'
import { produce } from 'immer'

function changeStateHelper(data: ListItem[], id: string, cb: (item: ListItem, path: ListItem[]) => void) {
  let path: ListItem[] = []
  const fn = (data: ListItem[], id: string, cb: (item: ListItem, path: ListItem[]) => void, level: number) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item.id === id) {
        path.push(item)
        cb(item, path)
      } else if (item.children) {
        path.push(item)
        fn(item.children, id, cb, ++level)
      }
      if (level === 0) {
        path = []
      }
    }
  }
  return fn(data, id, cb, 0)
}

export function getNextState(baseState: ListItem[], id: string, cb: (item: ListItem, path: ListItem[]) => void) {
  return produce(baseState, (draft) => {
    changeStateHelper(draft, id, cb)
  })
}

// export function sortState(baseState: ListItem[], dragId: string, nodeId: string) {
//   return produce(baseState, (draft) => {
//   })
// }

// export function getNextState(baseState: ListItem[], id: string, cb: (item: ListItem, path: ListItem[]) => void) {
//   let path: ListItem[] = []
//   return produce(baseState, (draft) => {
//     const fn = (data: ListItem[], id: string, cb: (item: ListItem, path: ListItem[]) => void, level: number) => {
//       for (let i = 0; i < data.length; i++) {
//         const item = data[i]
//         if (item.id === id) {
//           path.push(item)
//           cb(item, path)
//         } else if (item.children) {
//           path.push(item)
//           fn(item.children, id, cb, ++level)
//         }
//         if (level === 0) {
//           path = []
//         }
//       }
//     }
//     fn(draft, id, cb, 0)
//   })
// }
