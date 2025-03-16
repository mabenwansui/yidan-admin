'use client'
import { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
// import Link from '@tiptap/extension-link'
import { ConfigProvider } from 'antd'
import { CLASSNAME } from './constants'
import Selection from './extensions/Selection'
import { Link } from './extensions/Link'
import useEditorStore from './store'
import TextMenu from './ui/TextMenu'
import LinkMenu from './ui/LinkMenu'
import './index.css'

const Tiptap = () => {
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        code: false,
        codeBlock: false
      }),
      TextStyle,
      Color,
      Selection,
      Link.configure({
        protocols: ['http', 'https'],
        openOnClick: false,
        defaultProtocol: 'https'
      })
    ],
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off'
      }
    },
    content: '<p>Hello World!</p>'
  })
  const initEditor = useEditorStore((state) => state.initEditor)
  const commands = useEditorStore((state) => state.commands)
  useEffect(() => {
    if (editor) {
      initEditor(editor)
    }
  }, [editor, initEditor])
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
    <div ref={menuContainerRef}>
      <div className="h-full">
        <ConfigProvider getPopupContainer={(triggerNode: HTMLElement | undefined) => triggerNode || document.body}>
          <EditorContent className={`${CLASSNAME.EDITOR_CONTENT} ant-input ant-input-outlined`} editor={editor} />
          {/* <FloatingMenu editor={editor}>
          <span>float</span>
        </FloatingMenu> */}
          <TextMenu />
          <LinkMenu appendTo={menuContainerRef} />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Tiptap
