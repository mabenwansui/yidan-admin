export enum SERVER_FILE_PREFIX {
  IMG = 'https://localhost:4000/file/'
}

export enum SEARCH_PARAMS {
  BACK_URL = 'backurl'
}

export enum ROUTE_PATH {
  LOGIN = '/login',
  LOGIN_OUT = '/logout',
  REGISTER = '/register',
  HOME = '/',

  /** 商品 */
  COMMODITY = '/commodity',
  COMMODITY_CREATE = '/commodity/create',
  COMMODITY_EDIT = '/commodity/edit',
  COMMODITY_LIST = '/commodity/list',
  COMMODITY_SUCCESS_EDIT = '/commodity/success/edit',
  COMMODITY_SUCCESS_CREATE = '/commodity/success/create',

  /** 店铺 */
  STORE_LIST = '/store/list',
  STORE_COMMODITY = '/store/branch',

  /** 订单 */
  ORDER_LIST = '/order/list',
  ORDER_DETAILS = '/order/details',
  ORDER_ARCHIVED = '/order/list/archived',

  /** 标签 */
  TAG_REMARK = '/tag/remark',

  /** 用户 */
  USER_INFO = '/user/info',
  USER_ADMIN_LIST = '/user/users/admin/list',
  USER_STAFF_LIST = '/user/users/staff/list'
}
