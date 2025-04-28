import { useMemo, memo } from 'react'
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd'
import { useGetListSuperAdmin, SelectRoleType } from '@/common/hooks/useGetUserList'

interface Props extends AntSelectProps {
  role?: SelectRoleType[] | null
}

function Select(props: Props) {
  const { role, ...restProps } = props
  const { list, isLoading } = useGetListSuperAdmin({ pageSize: 9999, role: role || null })
  const options = useMemo(
    () =>
      list.map((item) => ({
        label: item.nickname,
        value: item.id
      })),
    [list]
  )
  return <AntSelect options={options} loading={isLoading} {...restProps} />
}
export default memo(Select)
