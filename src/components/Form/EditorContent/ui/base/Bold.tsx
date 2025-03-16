import Item from './Item'
import useEditorStore from '../../store'

export default function Bold() {
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  const handleClick = () => {
    commands().onBold()
  }
  return <Item title="加粗" iconName="bold" isActive={status().isBold()} onClick={handleClick} />
}
