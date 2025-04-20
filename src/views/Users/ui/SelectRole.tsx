import { memo } from 'react'
import { Select, SelectProps } from 'antd'
import { ROLE } from '@/common/constants/role'

const roleMapping = {
  all: '全部',
  [ROLE.ADMIN]: '管理员',
  [ROLE.STAFF]: '员工'
}

function SelectRole(props: Omit<SelectProps, 'options'> = {}) {
  return (
    <Select
      placeholder="请选择"
      options={(Object.keys(roleMapping) as Array<keyof typeof roleMapping>).map((item) => {
        return {
          label: roleMapping[item],
          value: item
        }
      })}
      {...props}
    />
  )
}

export default memo(SelectRole)
