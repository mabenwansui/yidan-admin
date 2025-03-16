import Item from './Item'
import useEditorStore from '../../store'

export default function Strikehrough() {
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  const handleClick = () => {
    commands().onStrike()
  }
  return <Item title="删除线" iconName="strikethrough" isActive={status().isStrike()} onClick={handleClick} />
}
