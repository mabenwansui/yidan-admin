import { memo } from 'react'
import Icon from '@/components/Icons'
import { Divider, Button, Tooltip } from 'antd'
import Image from '@/components/Image'
import { listItemProps } from '../_hooks/useGetStoreList'

interface Props {
  onAddList?: (storeId: string) => void
  store?: listItemProps
  isLoading: boolean
}

function BranchInfo(props: Props) {
  const { store, isLoading } = props
  const handleAddList = (storeId?: string) => {
    if (!storeId) return
    props.onAddList?.(storeId)
  }
  return (
    <section className="flex items-center rounded-lg bg-white border border-border p-4">
      <div className="img w-22">
        <Image imgUrl={store?.coverImageUrl} alt={store?.name} />
      </div>
      <div className="flex-auto">
        {isLoading === false && (
          <>
            <section className="flex w-full items-center">
              <div className="mr-5">{store?.name}</div>
              <Divider type="vertical" />
              <div className="ml-5 mr-5">
                <Tooltip title="店长">
                  <Icon className="relative top-0.5 text-gray-400" name="contact-round" />
                </Tooltip>
                &nbsp;{store?.ownerFormat}
              </div>
              <Divider type="vertical" />
              <div className="ml-5 text-green-500">{store?.openFormat}</div>
            </section>
            <section className="flex w-full mt-1.5">
              <div className="text-text-secondary">
                {store?.city}
                <Divider type="vertical" />
                {store?.poiName}
                <Divider type="vertical" />
                {store?.details}
              </div>
            </section>
          </>
        )}
      </div>
      <div className="w-30 flex justify-end">
        <Button onClick={() => handleAddList(store?.id)} className="pl-5! pr-5!" type="primary" size="large">
          上架商品
        </Button>
      </div>
    </section>
  )
}

export default memo(BranchInfo)
