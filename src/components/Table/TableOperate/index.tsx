import { Space, Popconfirm } from 'antd'

export enum OperateType {
  CUSTOM = 'custom',
  VIEW = 'view',
  EDIT = 'edit',
  DEL = 'del'
}

interface Item {
  name?: string
  type: OperateType
  onTrigger: () => void
}

interface Props {
  btnList: Item[]
}
export default function TableOperate(props: Props) {
  const { btnList } = props
  const mapping = {
    [OperateType.CUSTOM]: (record: Item) => (
      <a key={OperateType.CUSTOM} onClick={() => record.onTrigger()}>
        {record.name}
      </a>
    ),
    [OperateType.VIEW]: (record: Item) => (
      <a key={OperateType.VIEW} onClick={() => record.onTrigger()}>
        查看
      </a>
    ),
    [OperateType.EDIT]: (record: Item) => (
      <a key={OperateType.EDIT} onClick={() => record.onTrigger()}>
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
    <Space align="start" size="small" className="space-x-1.5">
      {btnList.map((item) => mapping[item.type](item))}
    </Space>
  )
}
