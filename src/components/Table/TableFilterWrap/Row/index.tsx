import { memo } from 'react'
import { Row as AntRow, RowProps } from 'antd'

function Row(props: RowProps) {
  return <AntRow gutter={[20, 20]} {...props} />
}
export default memo(Row)
