export enum SERVER_FILE_PREFIX {
  IMG = 'https://localhost:4000/file/'
}

export enum SEARCH_PARAMS {
  CUR_PAGE = 'curPage',
  PAGE_SIZE = 'pageSize',
  BACK_URL = 'backurl'
}

export enum ROUTE_PATH {
  LOGIN = '/login',
  LOGIN_OUT = '/logout',
  REGISTER = '/register',
  HOME = '/',

  /** 商品 */
  COMMODITY_CREATE = '/commodity/create',
  COMMODITY_LIST = '/commodity/list',
  COMMODITY_SUCCESS = '/commodity/success',

  /** 店铺 */
  STORE_LIST = '/store/list',
  STORE_COMMODITY = '/store/branch',

  /** 用户 */
  USER_INFO = '/user/info',
  USER_ADMIN_LIST = '/users/admin/list',
  USER_STAFF_LIST = '/users/staff/list'
}

export const routeTitleMapping: Record<string, string> = {
  [ROUTE_PATH.LOGIN]: '登录',
  [ROUTE_PATH.REGISTER]: '注册',
  [ROUTE_PATH.HOME]: '首页',
  [ROUTE_PATH.COMMODITY_CREATE]: '商品创建',
  [ROUTE_PATH.COMMODITY_LIST]: '商品列表',
  [ROUTE_PATH.COMMODITY_SUCCESS]: '商品操作成功',
  [ROUTE_PATH.STORE_LIST]: '店铺列表',
  [ROUTE_PATH.USER_ADMIN_LIST]: '用户管理',
  [ROUTE_PATH.USER_STAFF_LIST]: '用户管理'
}
