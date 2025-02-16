import Image from 'next/image'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import Nav from './Nav'
import Header from './Header'
import themeConfig from '@/common/css/theme.config'
import logo from './images/logo.svg'

const theme = themeConfig()

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          cssVar: false,
          hashed: false,
          token: {
            colorPrimary: theme['color-primary'],
            borderRadius: 4,
            controlHeight: 38
            // colorFillAlter: 'rgba(255,255,255)'
          }
        }}
      >
        <App>
          <div className="flex min-h-screen">
            <div className="w-64 bg-primary pl-1.5 pr-1.5">
              <div className="p-5 flex">
                <Image src={logo} priority alt="logo" width={64} height={64} />
                <div className="text-white flex flex-wrap items-center ml-3">
                  <div className="text-2xl w-full">易单</div>
                  <div className="text-sm w-full -mt-4">在线管理系统</div>
                </div>
              </div>
              <Nav />
            </div>
            <div className="flex-1">
              <Header />
              <main className="pt-8">{props?.children}</main>
            </div>
          </div>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
