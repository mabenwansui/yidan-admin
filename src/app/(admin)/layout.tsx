import type { Metadata } from 'next'
import Frame from '@/components/Frame'
import Layout from '@/components/Layout'

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
        <Frame>
          <Layout>{children}</Layout>
        </Frame>
      </body>
    </html>
  )
}
