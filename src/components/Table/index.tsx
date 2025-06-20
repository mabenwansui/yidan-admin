import { Table as AntTable, TableProps } from 'antd'
import cs from 'clsx'

function CustomTable<RecordType extends Record<any, any>>(props: TableProps) {
  const { className, ...rest } = props
  return (
    <AntTable<RecordType>
      // className={cs('w-full', className)}
      scroll={{
        scrollToFirstRowOnChange: true,
        x: 'max-content'
      }}
      sticky={true}
      tableLayout="fixed"
      {...rest}
    />
  )
}
const Table = Object.assign(CustomTable, {
  SELECTION_ALL: AntTable.SELECTION_ALL,
  SELECTION_INVERT: AntTable.SELECTION_INVERT,
  SELECTION_NONE: AntTable.SELECTION_NONE,
  SELECTION_COLUMN: AntTable.SELECTION_COLUMN,
  EXPAND_COLUMN: AntTable.EXPAND_COLUMN,
  Column: AntTable.Column,
  ColumnGroup: AntTable.ColumnGroup,
  Summary: AntTable.Summary,
  displayName: 'Table'
})
export default Table
