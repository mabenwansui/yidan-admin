import { Editor } from '@tiptap/react'

export type reutrnType = boolean | undefined

export interface EditorStore {
  editor: Editor | null
  initEditor: (editor: Editor) => void
  status: () => {
    isBold: () => boolean
    isItalic: () => boolean
    isStrike: () => boolean
    isLink: () => boolean
    currentColor: () => string
    currentHighlight: () => string
    currentFont: () => string
    currentSize: () => string
  }
  commands: () => {
    onBold: () => reutrnType
    onItalic: () => reutrnType
    onStrike: () => reutrnType
    // unFocus: () => void
    onChangeColor: (color: string) => reutrnType
    focus: () => reutrnType
    clearSelectionDecorations: () => reutrnType
    onLink: (url: string) => reutrnType
  }
}
