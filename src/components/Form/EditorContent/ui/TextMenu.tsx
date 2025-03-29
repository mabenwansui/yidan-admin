import { useMemo } from 'react'
import { Space } from 'antd'
import { BubbleMenu } from '@tiptap/react'
import { CLASSNAME } from '../constants'
import useEditorStore from '../store'
import Bold from './base/Bold'
import Italic from './base/Italic'
import Strikehrough from './base/Strikehrough'
import Palette from './base/Palette'
import Link from './base/Link/Link'
import useTextMenuShouldShow from '../hooks/useTextMenuShouldShow'
import 'tippy.js/animations/perspective-subtle.css'

export default function TextMenu() {
  const editor = useEditorStore((state) => state.editor)
  const { handleShouldShow } = useTextMenuShouldShow()
  const tippyOptions = useMemo(
    () => ({
      duration: 400,
      animation: 'perspective-subtle'
    }),
    []
  )
  return (
    editor && (
      <BubbleMenu
        pluginKey="textMenu"
        shouldShow={handleShouldShow}
        editor={editor}
        updateDelay={0}
        tippyOptions={tippyOptions}
      >
        <div className={CLASSNAME.BUBBLE_MENU_WRAPPER}>
          <Space size={4}>
            <Bold />
            <Italic />
            <Strikehrough />
            <Link />
            <Palette />
          </Space>
        </div>
      </BubbleMenu>
    )
  )
}
