import Image from 'next/image'
import Frame from '@/components/Frame'
import Nav from './ui/Nav'
import Header from './ui/Header'
import logo from './images/logo.svg'

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <Frame>
      <div className="flex min-h-screen">
        <div className="w-46 bg-primary pl-1.5 pr-1.5">
          <div className="p-5 flex">
            <Image src={logo} alt="logo" width={200} height={200} style={{ width: 64, height: 64 }} />
            <div className="text-white flex flex-wrap items-center ml-3">
              <div className="text-2xl w-full">易单</div>
              {/* <div className="text-sm w-full -mt-4">管理平台</div> */}
            </div>
          </div>
          <Nav />
        </div>
        <div className="flex-1" style={{ minWidth: '960px' }}>
          <Header />
          <main className="m-10">{props?.children}</main>
        </div>
      </div>
    </Frame>
  )
}
