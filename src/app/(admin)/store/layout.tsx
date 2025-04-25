interface Props {
  children: React.ReactNode
  overlay: React.ReactNode
}

export default function RootLayout({ children, overlay }: Props) {
  return (
    <>
      {children}
      {overlay}
    </>
  )
}
