import { memo } from 'react'
import { Select, SelectProps } from 'antd'
import { ROLE } from '@/common/constants/role'

export type ValueType = 'all' | ROLE.ADMIN | ROLE.STAFF

const options = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '管理员',
    value: ROLE.ADMIN
  },
  {
    label: '员工',
    value: ROLE.STAFF
  }
]

function SelectRole(props: Omit<SelectProps, 'options'> = {}) {
  return <Select<ValueType> placeholder="请选择" options={options} {...props} />
}

export default memo(SelectRole)
