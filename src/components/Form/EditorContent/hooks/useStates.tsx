import { Editor } from '@tiptap/react'
export default function useStates(editor: Editor) {
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
}
