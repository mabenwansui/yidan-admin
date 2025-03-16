import Item from './Item'
import useEditorStore from '../../store'

export default function Bold() {
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  const handleClick = () => {
    commands().onItalic()
  }
  return <Item title="斜体" iconName="italic" isActive={status().isItalic()} onClick={handleClick} />
}
