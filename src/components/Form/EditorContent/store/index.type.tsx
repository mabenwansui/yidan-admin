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
    currentLinkAttributes: () => Record<string, any> | undefined
    currentColor: () => string
    currentHighlight: () => string
    currentFont: () => string
    currentSize: () => string
    getHtml: () => string
  }
  commands: () => {
    // unFocus: () => void
    clearSelectionDecorations: () => reutrnType
    focus: () => reutrnType
    focusEnd: () => void
    onBold: () => reutrnType
    onItalic: () => reutrnType
    onStrike: () => reutrnType
    onChangeColor: (color: string) => reutrnType
    onLink: (url: string) => reutrnType
    onUnLink: () => reutrnType
    extendMarkRangeLink: () => void
    setValue: (value: string) => reutrnType
  }
}
