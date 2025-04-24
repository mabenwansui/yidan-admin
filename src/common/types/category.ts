export interface Category {
  id: string
  title: string
  parentId?: string
  childrenIds?: string[]
  level?: number
}
