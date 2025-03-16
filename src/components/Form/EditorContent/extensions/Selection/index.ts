import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    selection: {
      clearSelectionDecorations: () => ReturnType
    }
  }
}

const pluginKey = new PluginKey('selection')

export const Selection = Extension.create({
  name: 'selection',
  addCommands() {
    return {
      clearSelectionDecorations:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(pluginKey, { forceClear: true })
            dispatch(tr)
          }
          return true
        }
    }
  },
  addProseMirrorPlugins() {
    const { editor } = this
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init() {
            return { forceClear: false }
          },
          apply(tr) {
            return {
              forceClear: tr.getMeta(pluginKey)?.forceClear || false
            }
          }
        },
        props: {
          decorations(state) {
            const { forceClear } = pluginKey.getState(state)
            // 强制清除时直接返回空
            if (forceClear) return null
            if (state.selection.empty) {
              return null
            }
            if (editor.isFocused === true) {
              return null
            }
            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: 'selection'
              })
            ])
          }
        }
      })
    ]
  }
})

export default Selection
