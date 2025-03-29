'use client'
import { useEffect, useRef, memo, useImperativeHandle, Ref } from 'react'
import { EditorContent as TipTapEditorContent } from '@tiptap/react'
import { ConfigProvider } from 'antd'
import useEditor from './hooks/useEditor'
import { CLASSNAME } from './constants'
import useEditorStore from './store'
import TextMenu from './ui/TextMenu'
import LinkMenu from './ui/LinkMenu'
import './index.css'

export interface RefMethods {
  getHtml: () => string
}
interface Props {
  className: string
  value: string
  ref?: Ref<RefMethods>
}

function EditorContent(props: Props) {
  const { value, className } = props
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const editor = useEditor(value)
  const initEditor = useEditorStore((state) => state.initEditor)
  const status = useEditorStore((state) => state.status)
  const commands = useEditorStore((state) => state.commands)
  useEffect(() => {
    if (editor) {
      initEditor(editor)
    }
  }, [editor, initEditor])
  useImperativeHandle(props?.ref, () => {
    return {
      getHtml: () => status().getHtml()
    }
  })
  useEffect(() => {
    const controller = new AbortController()
    document.addEventListener(
      'click',
      (event) => {
        const target = event.target
        const elem = [CLASSNAME.EDITOR_CONTENT, CLASSNAME.BUBBLE_MENU_WRAPPER]
        const isInsideTarget = target && target instanceof Element && elem.some((item) => !!target.closest(`.${item}`))
        if (!isInsideTarget) {
          commands().clearSelectionDecorations()
        }
      },
      {
        signal: controller.signal
      }
    )
    return () => {
      controller.abort()
    }
  }, [commands])
  return (
    <div className={className} ref={menuContainerRef}>
      <div className="h-full">
        <ConfigProvider getPopupContainer={(triggerNode: HTMLElement | undefined) => triggerNode || document.body}>
          <TipTapEditorContent className={`${CLASSNAME.EDITOR_CONTENT} ant-input ant-input-outlined`} editor={editor} />
          <TextMenu />
          <LinkMenu appendTo={menuContainerRef} />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default memo(EditorContent)
