import type { Metadata } from 'next'
import { App } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import AntAppRoot from '@/components/AntAppRoot'
import '@/common/css/index.scss'

export const metadata: Metadata = {
  title: '易单后台系统',
  description: '易单后台管理平台',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AntdRegistry>
          <App>{children}</App>
          <AntAppRoot />
        </AntdRegistry>
      </body>
    </html>
  )
}
