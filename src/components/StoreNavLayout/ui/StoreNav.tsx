import { memo } from 'react'
import Icon from '@/components/Icons'
import useStore from '../store'

function BranchNav() {
  const list = useStore((state) => state.list)
  const curStore = useStore((state) => state.curStore)
  const setCurStore = useStore((state) => state.setCurStore)
  const handleClick = (id: string) => {
    if (curStore?.id === id) return
    setCurStore(id)
  }
  return (
    <div className="bg-white rounded-lg w-full border border-border sticky top-0">
      <div className="flex border-b-1 border-border p-4 items-center">
        <Icon name="store" className="mr-2" />
        <span className="font-bold">店铺</span>
      </div>
      <div className="pt-2 pb-2">
        <ul
          className="
          *:hover:bg-primary-light
            *:p-4 
            *:truncate
            *:pt-2
            *:pb-2 
            *:cursor-pointer
            [&_.active]:text-link!
            [&_.active]:font-bold!
          "
        >
          {list?.map((store) => (
            <li
              key={store.id}
              onClick={() => handleClick(store.id)}
              className={store.id === curStore?.id ? 'active' : ''}
            >
              {store.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(BranchNav)
