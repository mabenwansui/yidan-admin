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
      currentLinkAttributes: () => editor?.getAttributes('link'),
      currentHighlight: () => editor?.getAttributes('highlight')?.color,
      currentFont: () => editor?.getAttributes('textStyle')?.fontFamily,
      currentSize: () => editor?.getAttributes('textStyle')?.fontSize,
      getHtml: () => editor?.getHTML() || ''
    }
  },
  commands: () => {
    const { editor } = get()
    return {
      clearSelectionDecorations: () => editor?.chain().clearSelectionDecorations().run(),
      focus: () => editor?.chain().focus().run(),
      focusEnd: () => editor?.commands.focus(editor.state.selection.to),
      onBold: () => editor?.chain().focus().toggleBold()?.run(),
      onItalic: () => editor?.chain().focus().toggleItalic().run(),
      onStrike: () => editor?.chain().focus().toggleStrike().run(),
      onChangeColor: (color) => editor?.chain().focus()?.setColor(color).run(),
      onLink: (url) => editor?.chain().focus().setLink({ href: url }).run(),
      onUnLink: () => editor?.chain().focus().extendMarkRange('link').unsetLink().run(),
      extendMarkRangeLink: () => editor?.commands.extendMarkRange('link'),
      setValue: (value: string) => editor?.commands.setContent(value)
    }
  }
}))

export default useEditorStore
