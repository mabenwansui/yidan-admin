import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import '@/common/css/index.scss'

export const metadata: Metadata = {
  title: '易单1',
  description: '易单管理系统'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased layout-bg">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
