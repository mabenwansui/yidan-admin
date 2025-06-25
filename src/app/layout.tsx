import Frame from '@/components/Layout/Frame'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '易单',
  description: '易单管理系统'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased layout-bg">
        <Frame>{children}</Frame>
      </body>
    </html>
  )
}
