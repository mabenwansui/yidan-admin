import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import themeConfig from '@/common/css/theme/theme.config'
import { ConfigProvider, App } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const theme = themeConfig()

interface Props {
  children: React.ReactNode
}

export default function Frame(props: Props) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhCN}
        theme={{
          cssVar: false,
          hashed: false,
          token: {
            colorPrimary: theme['color-primary'],
            borderRadius: 4
            // controlHeight: 38
            // colorFillAlter: 'rgba(255,255,255)'
          },
          components: {
            Tree: {
              nodeSelectedBg: theme['bg-node-selected'],
              indentSize: 20
            },
            TreeSelect: {
              nodeSelectedBg: theme['bg-node-selected'],
              indentSize: 20
            },
            Pagination: {
              itemSize: 30,
              itemSizeSM: 20
            }
          }
        }}
      >
        <App>{props?.children}</App>
      </ConfigProvider>
    </AntdRegistry>
  )
}
