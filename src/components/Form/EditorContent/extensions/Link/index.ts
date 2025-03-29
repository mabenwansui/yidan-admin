import { mergeAttributes } from '@tiptap/core'
import TiptapLink from '@tiptap/extension-link'
// import { Plugin } from '@tiptap/pm/state'
// import { EditorView } from '@tiptap/pm/view'

export const Link = TiptapLink.extend({
  inclusive: false,
  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
        getAttrs: (element) => {
          // check if link starts with javascript:
          if (element.getAttribute('href')?.toLowerCase().startsWith('javascript:')) {
            return false
          }
          return null
        }
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes.href?.toLowerCase().startsWith('javascript:')) {
      return ['a', mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: '' }, { class: 'link' }), 0]
    }
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'link' }), 0]
  }
})
