import { Space, Popconfirm } from 'antd'

export enum OperateType {
  EDIT = 'edit',
  DEL = 'del'
}

interface Item {
  type: OperateType
  onTrigger: () => void
}

interface Props {
  btnList: Item[]
}
export default function TableOperate(props: Props) {
  const { btnList } = props
  const mapping = {
    [OperateType.EDIT]: (record: Item) => (
      <a key={OperateType.EDIT} className="mr-1.5" onClick={() => record.onTrigger()}>
        编辑
      </a>
    ),
    [OperateType.DEL]: (record: Item) => (
      <Popconfirm
        key={OperateType.DEL}
        okButtonProps={{ danger: true }}
        title="确认删除吗?"
        onConfirm={() => record.onTrigger()}
      >
        <a>删除</a>
      </Popconfirm>
    )
  }
  return (
    <Space align="start" size="small">
      {btnList.map((item) => mapping[item.type](item))}
    </Space>
  )
}
