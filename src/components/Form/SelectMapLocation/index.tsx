import { useState, MouseEventHandler } from 'react'
import cs from 'clsx'
import { Input, InputProps } from 'antd'
import { AimOutlined } from '@ant-design/icons'
import SelectMapLocationModal from './ui/SelectMapLocationModal'
import { AddressLocationSelect } from '@/common/types/address'

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  value?: AddressLocationSelect
  onChange?: (props: AddressLocationSelect) => void
}

export default function SelectMapLocation(props: Props) {
  const { value, className, placeholder, onChange, ...rest } = props
  const [open, setOpen] = useState(false)
  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    setOpen(true)
    props.onClick?.(e)
  }
  const handleOk = (params: AddressLocationSelect) => {
    setOpen(false)
    onChange?.(params)
  }
  const handleCancel = () => setOpen(false)
  const _value = value ? `${value?.poiName}-${value?.poiAddress}` : ''
  const _plackholder = placeholder || '请选择位置'
  return (
    <>
      <Input
        readOnly
        value={_value}
        placeholder={_plackholder}
        onClick={handleClick}
        className={cs('[&_input]:cursor-pointer!', className)}
        {...rest}
        suffix={<AimOutlined />}
      />
      <SelectMapLocationModal onOk={handleOk} onCancel={handleCancel} open={open} />
    </>
  )
}
