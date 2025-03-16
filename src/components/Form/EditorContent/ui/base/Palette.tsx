import { useState } from 'react'
import Item from './Item'
import useEditorStore from '../../store'
import { ColorPicker, ColorPickerProps } from 'antd'
import { COLOR } from '../../constants'

const presetsColor = [
  COLOR.BLACK,
  COLOR.LIGHT_GRAY,
  COLOR.BLUE,
  COLOR.RED,
  COLOR.YELLOW,
  COLOR.GREEN,
  COLOR.ORANGE,
  COLOR.PINK
]
export default function Palette() {
  const [color, setColor] = useState<string>(COLOR.BLACK)
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  const handleChange: ColorPickerProps['onChange'] = (color, css) => {
    setColor(css)
    commands().onChangeColor(css)
  }
  const handleOpenChange: ColorPickerProps['onOpenChange'] = (open) => {
    if (!open) {
      commands().focus()
    } else {
      const curColor = status().currentColor()
      if (curColor) {
        setColor(status().currentColor())
      }
    }
  }
  return (
    <ColorPicker
      presets={[{ label: '字体颜色', colors: presetsColor }]}
      placement="top"
      disabledAlpha={true}
      disabledFormat={true}
      trigger="hover"
      value={color}
      onChange={handleChange}
      onOpenChange={handleOpenChange}
    >
      <span>
        <Item iconName="palette" />
      </span>
    </ColorPicker>
  )
}
