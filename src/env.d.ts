declare global {
  /**
   * 提取对象 value 的联合类型
   * 用于代替 typeof Obj[keyof typeof Obj] 的简写
   */
  type ValueOf<T> = T[keyof T]
}
export {}
