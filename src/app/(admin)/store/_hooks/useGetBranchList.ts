import { useMemo } from 'react'
import { useSWRList } from '@/common/hooks/useAjax'
import { Branch } from '@/common/types/branch'
import { Page } from '@/common/types/page'
import { OnShelfStatus } from '@/common/constants/fields'

const url = '/api/branch/search-commodity'

interface Params extends Page {
  storeId?: string
  commodityId?: string
  isOnShelf?: boolean
  categoryId?: string
}

interface Response extends Page {
  list: Branch[]
}

function dataFormat(list: Branch[]) {
  return list?.map((item) => {
    return {
      isOnShelfFormat: item.isOnShelf ? OnShelfStatus.On : OnShelfStatus.Off,
      ...item
    }
  })
}

export default function useGetBranchList(params: Params) {
  const _url = params?.storeId ? url : null
  const { list, ...rest } = useSWRList<Params, Response>(_url, params)
  const _list = useMemo(() => dataFormat(list), [list])
  return {
    list: _list,
    ...rest
  }
}
