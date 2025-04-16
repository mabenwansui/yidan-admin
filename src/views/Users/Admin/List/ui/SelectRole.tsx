import { memo } from 'react'
import { Select, SelectProps } from 'antd'
import { ROLE } from '@/common/constants/role'

const roleMapping = {
  [ROLE.ADMIN]: '管理员',
  [ROLE.STAFF]: '员工'
}

function SelectRole(props: Omit<SelectProps, 'options'> = {}) {
  return (
    <Select
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
