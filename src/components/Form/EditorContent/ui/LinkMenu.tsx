import { useMemo, useCallback } from 'react'
import { BubbleMenu, useEditorState } from '@tiptap/react'
import { CLASSNAME } from '../constants'
import useEditorStore from '../store'
import LinkFormItem from './base/LinkFormItem'
import 'tippy.js/animations/perspective-subtle.css'

interface MenuProps {
  appendTo?: React.RefObject<any>
  shouldHide?: boolean
}

export default function LinkMenu({ appendTo }: MenuProps) {
  const editor = useEditorStore((state) => state.editor)
  const status = useEditorStore((state) => state.status)
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx?.editor?.getAttributes('link')
      return { link: attrs?.href, target: attrs?.target }
    }
  })
  console.log('link', state?.link)
  console.log('target', state?.target)
  const tippyOptions = useMemo(
    () => ({
      duration: 400,
      animation: 'perspective-subtle',
      appendTo: () => {
        return appendTo?.current
      }
      // trigger: 'mouseenter',
      // onTirgger: () => {

      // }
    }),
    [appendTo]
  )
  const handleShouldShow = useCallback(() => {
    console.log('amben:::::', status().isLink())
    return !!status().isLink()
  }, [status])
  return (
    editor && (
      <BubbleMenu
        pluginKey="linkMenu"
        shouldShow={handleShouldShow}
        editor={editor}
        updateDelay={0}
        tippyOptions={tippyOptions}
      >
        <div className={CLASSNAME.BUBBLE_MENU_WRAPPER}>
          <LinkFormItem onSubmit={() => {}} />
        </div>
      </BubbleMenu>
    )
  )
}
