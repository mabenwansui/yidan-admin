import { SERVER_FILE_PREFIX } from '@/common/constants/routePath'
import { post } from '@/common/utils/ajax'
import { useSWR } from '@/common/hooks/useAjax'
import { Commodity } from '@/common/types/commodity'
import { UploadFile } from 'antd'

interface Props {
  commodityId: string
  format: FORMAT_TYPE
}
export enum FORMAT_TYPE {
  FORM = 'Form'
}
interface Response extends Omit<Commodity, 'category'> {
  category: { id: string; title: string }
}
export const url = '/api/commodity/get-info'

const format4Form = (data: Response) => {
  const { category, imgNames, ...rest } = data
  const _imgNames: UploadFile[] | undefined = imgNames?.map((item) => ({
    uid: item,
    name: item,
    status: 'done',
    url: `${SERVER_FILE_PREFIX.IMG}/${item}`
  }))
  return {
    imgNames: _imgNames,
    category: {
      label: category.title,
      value: category.id
    },
    ...rest
  }
}

const fetcher = async ({ arg }: { arg: Props }) => await post<Response>(url, arg)
export default function useGetCommodityInfo(params: Props) {
  const { commodityId, format } = params
  const { data, isLoading, mutate } = useSWR(
    {
      url: `${url}`,
      arg: { id: commodityId }
    },
    fetcher
  )

  let formatData
  if (data?.data) {
    switch (format) {
      case FORMAT_TYPE.FORM:
        formatData = format4Form(data.data)
        break
    }
  }
  return {
    mutate,
    data: formatData,
    isLoading
  }
}
