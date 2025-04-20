import { memo } from 'react'
export { default as Row } from './Row'

interface Props {
  children: React.ReactNode
}
function TableFilter(props: Props) {
  return <section className="w-full bg-white mb-5 p-6 pb-0 rounded-lg border border-border">{props?.children}</section>
}

export default memo(TableFilter)
