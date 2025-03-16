import { create } from 'zustand'
import { Editor } from '@tiptap/react'
import { EditorStore } from './index.type'

const useEditorStore = create<EditorStore>((set, get) => ({
  editor: null,
  initEditor: (editor: Editor) => set({ editor }),
  status: () => {
    const { editor } = get()
    return {
      isBold: () => !!editor?.isActive('bold'),
      isItalic: () => !!editor?.isActive('italic'),
      isStrike: () => !!editor?.isActive('strike'),
      isLink: () => !!editor?.isActive('link'),
      currentColor: () => editor?.getAttributes('textStyle')?.color,
      currentHighlight: () => editor?.getAttributes('highlight')?.color,
      currentFont: () => editor?.getAttributes('textStyle')?.fontFamily,
      currentSize: () => editor?.getAttributes('textStyle')?.fontSize
    }
  },
  commands: () => {
    const { editor } = get()
    return {
      clearSelectionDecorations: () => editor?.chain()?.clearSelectionDecorations()?.run(),
      focus: () => editor?.chain()?.focus()?.run(),
      // unFocus: () => editor?.view?.dom?.blur(),
      onBold: () => editor?.chain()?.focus()?.toggleBold()?.run(),
      onItalic: () => editor?.chain()?.focus()?.toggleItalic()?.run(),
      onStrike: () => editor?.chain()?.focus()?.toggleStrike()?.run(),
      onChangeColor: (color) => editor?.chain()?.focus()?.setColor(color).run(),
      onLink: (url) => editor?.chain()?.focus()?.setLink({ href: url })?.run()
    }
  }
}))

export default useEditorStore
