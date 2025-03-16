import { Editor } from '@tiptap/core'

export default function useCommand(editor: Editor) {
  return {
    clearSelectionDecorations: () => editor?.chain()?.clearSelectionDecorations()?.run(),
    focus: () => editor?.chain()?.focus()?.run(),
    onBold: () => editor?.chain()?.focus()?.toggleBold()?.run(),
    onItalic: () => editor?.chain()?.focus()?.toggleItalic()?.run(),
    onStrike: () => editor?.chain()?.focus()?.toggleStrike()?.run(),
    onChangeColor: (color: string) => editor?.chain()?.focus()?.setColor(color).run(),
    onLink: (url: string) => editor?.chain()?.focus()?.setLink({ href: url })?.run()
    // unFocus: () => editor?.view?.dom?.blur(),
  }
}
