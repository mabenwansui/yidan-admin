import { useEffect } from 'react'
import useInitStore from './store/useInitStore'
import useStore from './store'
import StoreNav from './ui/StoreNav'
interface Props {
  onChange?: (id: string) => void
  children?: React.ReactNode
}
export default function StoreNavLayout(props: Props) {
  const { children, onChange = () => {} } = props
  useInitStore()
  const list = useStore((state) => state.list)
  const curStore = useStore((state) => state.curStore)
  const setCurStore = useStore((state) => state.setCurStore)
  useEffect(() => {
    if (!list || list.length === 0) return
    if (curStore) {
      onChange(curStore.id)
    } else {
      const id = list[0].id
      setCurStore(id)
    }
  }, [curStore, list, onChange, setCurStore])
  return (
    <div className="flex justify-between">
      <div className="w-34 min-w-34">{<StoreNav />}</div>
      <div className="flex-auto ml-6 min-w-0">{children}</div>
    </div>
  )
}
