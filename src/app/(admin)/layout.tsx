import Layout from '@/components/Layout/NavLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
