export enum ERROR_CLIENT_CODE {
  /** 请求超时 */
  TIMEOUT = '101',
  /** 未知错误 */
  UNKNOWN = '201'
}

/** 与后端同步 */
const COMMON_ERROR_CODE = {
  /** 请求资源不存在 */
  NOT_FOUND: '10001',
  /** 请求参数错误 */
  BAD_REQUEST: '10002',
  /** 请求参数错误DTO */
  BAD_REQUEST_DTO: '10003'
}

const USER_ERROR_CODE = {
  /** 登录失败, 用户名或密码错误 */
  LOGIN_FAILURE: '11101',
  /** 权限校验失败, 请重新登录 */
  AUTH_CHECK_ERROR: '11102',
  /** 权限校验失败, 请重新登录 */
  AUTH_REFRESH_CHECK_ERROR: '11103',
  /** 验证码已过期 */
  CAPTCHA_NOT_FOUND: '11104',
  /** 验证码错误, 请重新输入 */
  CAPTCHA_ERROR: '11105',
  /** 创建用户失败, 服务器内部错误，请联系管理员 */
  CREATE_USER_ERROR: '11106',
  /** 用户名已存在 */
  USER_ALREADY_USED: '11107',
  /** 用户不存在 */
  USER_NOT_FOUND: '11108'
}

const FILE_ERROR_CODE = {
  /** 上传图片格式错误 */
  UPLOAD_IMAGE_MIMETYPE_ERROR: '12001',
  /** 上传图片大小错误 */
  UPLOAD_IMAGE_SIZE_ERROR: '12002'
}

const COMMODITY_ERROR_CODE = {
  /** 创建失败, 服务器内部错误, 请联系管理员 */
  CREATE_COMMODITY_CATEGORY_ERROR: '13100',
  /** 更新商品分类错误 */
  UPDATE_COMMODITY_CATEGORY_ERROR: '13111',
  /** 更新错误, 根节点不能修改 */
  UPDATE_COMMODITY_CATEGORY_ROOT_ERROR: '13112',
  /** 删除商品分类错误 */
  DELETE_COMMODITY_CATEGORY_ERROR: '13121',
  /** 删除错误, 服务器内部错误, 请联系管理员 */
  DELETE_NOT_FOUND_COMMODITY_CATEGORY: '13122',
  /** 未查询到父级分类 */
  NOT_FOUND_COMMODITY_CATEGORY_PARENT: '13501',
  /** 分类已存在 */
  COMMODITY_CATEGORY_ALREADY_USED: '13502'
}

export const ERROR_CODE = {
  ...COMMON_ERROR_CODE,
  ...USER_ERROR_CODE,
  ...FILE_ERROR_CODE,
  ...COMMODITY_ERROR_CODE
}
