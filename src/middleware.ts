import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_KEY } from '@/common/constants/cookie'
import { SEARCH_PARAMS, ROUTE_PATH } from '@/common/constants/routePath'

function auth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_KEY.TOKEN)
  const curUrl = req.url
  const redirectUrl = `${ROUTE_PATH.LOGIN}?${SEARCH_PARAMS.BACK_URL}=${encodeURIComponent(curUrl)}`
  if (!token) {
    return NextResponse.redirect(new URL(redirectUrl, curUrl))
  }
}

export async function middleware(req: NextRequest) {
  auth(req)
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/commodity/:path*']
}
