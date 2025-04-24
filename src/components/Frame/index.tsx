import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import '@/common/css/index.css'

interface Props {
  children: React.ReactNode
}

export default function Frame(props: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhCN}
        theme={{
          cssVar: true,
          hashed: false,
          token: {
            colorPrimary: '#3730a3',
            colorInfo: '#3730a3',
            borderRadius: 4
            // controlHeight: 38
            // colorFillAlter: 'rgba(255,255,255)'
          },
          components: {
            Tree: {
              nodeSelectedBg: '#c6d2ff',
              indentSize: 20
            },
            TreeSelect: {
              nodeSelectedBg: '#c6d2ff',
              indentSize: 20
            },
            Pagination: {
              itemSize: 30,
              itemSizeSM: 20
            },
            Table: {
              headerBorderRadius: 8,
              headerBg: '#F8FAFB'
            }
          }
        }}
      >
        <App>{props?.children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
