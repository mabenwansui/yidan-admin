import { useEditor as useTipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Selection from '../extensions/Selection'
import { Link } from '../extensions/Link'

export default function useEditor() {
  const editor = useTipTapEditor({
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
  return editor
}
