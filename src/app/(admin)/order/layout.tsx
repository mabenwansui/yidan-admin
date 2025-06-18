interface Props {
  children: React.ReactNode
  overlay: React.ReactNode
}

export default function CommodityLayout({ children, overlay }: Props) {
  return [overlay, children]
}
