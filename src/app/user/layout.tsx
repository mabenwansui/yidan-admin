import type { Metadata } from 'next'
import Frame from '@/components/Frame'
import '@/common/css/index.scss'

export const metadata: Metadata = {
  title: '易单后台系统',
  description: '易单后台管理平台'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <Frame>{children}</Frame>
      </body>
    </html>
  )
}
