import { ROUTE_PATH } from '@/common/constants/routePath'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function configFn() {
  return [
    {
      path: ROUTE_PATH.LOGIN,
      render: [{ title: '登录' }]
    },
    {
      path: ROUTE_PATH.REGISTER,
      render: [{ title: '注册' }]
    },
    {
      path: ROUTE_PATH.HOME,
      render: [{ title: '首页' }]
    },
    {
      path: ROUTE_PATH.COMMODITY_EDIT,
      match: new RegExp(`^${ROUTE_PATH.COMMODITY_EDIT}\\/[0-9a-zA-Z]+$`, 'gi'),
      render: [{ title: <Link href={ROUTE_PATH.COMMODITY_LIST}>商品管理</Link> }, { title: '商品编辑' }]
    },
    {
      path: ROUTE_PATH.COMMODITY_LIST,
      render: [{ title: '商品列表' }]
    },
    {
      path: ROUTE_PATH.STORE_LIST,
      render: [{ title: '店铺列表' }]
    },
    {
      path: ROUTE_PATH.USER_ADMIN_LIST,
      render: [{ title: '用户管理' }]
    },
    {
      path: ROUTE_PATH.USER_STAFF_LIST,
      render: [{ title: '用户管理' }]
    },
    {
      path: ROUTE_PATH.ORDER_LIST,
      match: new RegExp(`^${ROUTE_PATH.ORDER_LIST}\\/[0-9a-zA-Z]+$`, 'gi'),
      render: [{ title: '订单列表' }]
    },
    {
      path: ROUTE_PATH.ORDER_ARCHIVED,
      match: new RegExp(`^${ROUTE_PATH.ORDER_ARCHIVED}\\/[0-9a-zA-Z]+$`, 'gi'),
      render: [{ title: '订单列表 - 已归档' }]
    },
    {
      path: ROUTE_PATH.ORDER_DETAILS,
      match: new RegExp(`^${ROUTE_PATH.ORDER_DETAILS}\\/[0-9a-zA-Z]+$`, 'gi'),
      render: [
        {
          title: <Link href={ROUTE_PATH.ORDER_LIST}>返回列表</Link>
        },
        { title: '订单详情' }
      ]
    },
    {
      path: ROUTE_PATH.TAG_REMARK,
      render: [{ title: '订单备注' }]
    }
  ]
}

export default function useBreadcrumbConfig() {
  const pathname = usePathname()
  const config = configFn()
  const result = config.find((item) => {
    if (item.path === pathname) {
      return true
    } else if (item.match && item.match.test(pathname) === true) {
      return true
    }
    return false
  })
  return result ? [result.render] : []
}
