import { useState, useMemo, useCallback, useEffect } from 'react'
import { BubbleMenu } from '@tiptap/react'
import { CLASSNAME } from '../constants'
import useEditorStore from '../store'
import LinkFormItem from './base/Link/LinkFormItem'
import LinkPreviewItem from './base/Link/LinkPreviewItem'
import 'tippy.js/animations/perspective-subtle.css'

interface MenuProps {
  appendTo?: React.RefObject<any>
  shouldHide?: boolean
}

export default function LinkMenu({ appendTo }: MenuProps) {
  const [val, setVal] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const editor = useEditorStore((state) => state.editor)
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  useEffect(() => {
    if (isShow) {
      const linkAttributes = status()?.currentLinkAttributes()
      const href = linkAttributes?.href
      setVal(href)
    } else {
      setVal('')
    }
  }, [status, isShow])
  const handleShouldShow = useCallback(() => {
    return status().isLink()
  }, [status])
  const handleChange = (val: string) => setVal(val)
  const handleSubmit = () => {
    setIsEdit(false)
    commands().extendMarkRangeLink()
    commands().onLink(val)
  }
  const handleRemove = () => {
    commands().onUnLink()
    commands().focusEnd()
  }
  const handleCancel = () => setIsEdit(false)
  const handleEdit = () => setIsEdit(true)
  const tippyOptions = useMemo(
    () => ({
      duration: 400,
      animation: 'perspective-subtle',
      appendTo: () => appendTo?.current,
      onShow: () => {
        setIsShow(true)
      },
      onHidden: () => setIsShow(false)
    }),
    [appendTo]
  )
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
          {isEdit ? (
            <LinkFormItem value={val} onCancel={handleCancel} onChange={handleChange} onSubmit={handleSubmit} />
          ) : (
            <LinkPreviewItem onEdit={handleEdit} onRemove={handleRemove} href={val} />
          )}
        </div>
      </BubbleMenu>
    )
  )
}
