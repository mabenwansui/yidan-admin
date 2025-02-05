import Image from 'next/image'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import Nav from './Nav'
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
          cssVar: true,
          hashed: false,
          token: {
            colorPrimary: theme['color-primary'],
          },
        }}
      >
        <App>
          <div className="flex h-screen">
            <div className="w-64 bg-primary pl-1.5 pr-1.5">
              <div className="p-5 flex">
                <Image src={logo} alt="logo" width={64} height={64} />
                <div className="text-white flex flex-wrap items-center ml-3">
                  <div className="text-2xl w-full">易单</div>
                  <div className="text-sm w-full -mt-4">在线管理系统</div>
                </div>
              </div>
              <Nav />
            </div>
            <main className="flex-1">{props?.children}</main>
          </div>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
