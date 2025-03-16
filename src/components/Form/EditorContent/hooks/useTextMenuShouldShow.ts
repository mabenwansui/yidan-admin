import { useCallback } from 'react'
import useEditorStore from '../store'
import isTextSelected from '../utils/isTextSelected'
import { Editor } from '@tiptap/react'

export default function useTextMenuShouldShow() {
  const status = useEditorStore((state) => state.status)
  const handleShouldShow = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (!editor) {
        return false
      }
      if (status().isLink()) {
        return false
      }
      const arr = [isTextSelected({ editor }), status().isBold(), status().isItalic(), status().isStrike()]
      return arr.some((item) => item)
    },
    [status]
  )
  return {
    handleShouldShow
  }
}
