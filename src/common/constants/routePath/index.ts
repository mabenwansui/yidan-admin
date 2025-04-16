export enum SERVER_FILE_PREFIX {
  IMG = 'https://localhost:4000/file/'
}

export enum SEARCH_PARAMS {
  CUR_PAGE = 'curpage',
  PAGE_SIZE = 'pagesize',
  BACK_URL = 'backurl'
}

export enum ROUTE_PATH {
  LOGIN = '/user/login',
  REGISTER = '/user/register',
  HOME = '/',

  /** 商品 */
  COMMODITY_CREATE = '/commodity/create',
  COMMODITY_EDIT = '/commodity/edit',
  COMMODITY_LIST = '/commodity/list',
  COMMODITY_SUCCESS = '/commodity/success',

  /** 项目 */
  PROJECT_CREATE = '/project/create',
  PROJECT_EDIT = '/project/edit',
  PROJECT_LIST = '/project/list',
  PROJECT_SUCCESS = '/project/success',

  /** 用户 */
  USER_ADMIN_LIST = '/users/admin/list',
  USER_STAFF_LIST = '/users/staff/list'
}
