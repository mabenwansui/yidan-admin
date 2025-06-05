import '@ant-design/v5-patch-for-react-19'
import { memo, useState, useMemo, Ref, useImperativeHandle, useCallback } from 'react'
import Link from 'next/link'
import { Form, Input, Space, InputNumber, Switch } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { BranchForm } from '@/common/types/branch'
import { Commodity } from '@/common/types/commodity'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { useGetCommodityInfoMutation } from '@/common/hooks/useGetCommodityInfo'
import { WithCategory } from '@/components/Form/SelectCommodity'

export interface RefMethods {
  submit: () => void
  resetFields: () => void
}

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  initialValues?: BranchForm
}

function CustomForm(props: Props) {
  const { onFinish, ref, initialValues = {} } = props
  const [_, setCurCommodity] = useState<Commodity>()
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  const [form] = Form.useForm()
  const originalPrice = Form.useWatch('originalPrice', form)
  const price = Form.useWatch('price', form)
  const { trigger: getCommodityInfo } = useGetCommodityInfoMutation()
  useImperativeHandle(
    ref,
    () => ({
      resetFields: () => form.resetFields(),
      submit: () => form.submit()
    }),
    [form]
  )
  const mergeInitialValues = useMemo(() => {
    return {
      ...{ soldCount: 0 },
      ...initialValues
    }
  }, [initialValues])

  const discount = useMemo(() => {
    if (originalPrice && price && originalPrice > price) {
      return parseFloat((price / originalPrice).toFixed(2))
    } else {
      return 0
    }
  }, [originalPrice, price])

  const handleFinish = useCallback((values: any) => onFinish?.(values), [onFinish])
  const handleValuesChange = useCallback(
    async (changedValues: BranchForm) => {
      const { commodity } = changedValues
      if (commodity) {
        const { flag, data } = await getCommodityInfo({ id: commodity.value })
        if (flag == 1) {
          setCurCommodity(data)
        }
      }
    },
    [getCommodityInfo]
  )
  return (
    <Form
      form={form}
      initialValues={mergeInitialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="storeId" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item label={`上架商品`} required>
        <Space>
          <Form.Item name="commodity" noStyle rules={[{ required: true, message: '请选择商品' }]}>
            <WithCategory />
          </Form.Item>
          <Link href={ROUTE_PATH.COMMODITY_LIST} target="_blank" className="mr-1.5 ml-2">
            商品管理
          </Link>
        </Space>
      </Form.Item>
      <Form.Item name="stockConunt" label="库存数量">
        <InputNumber placeholder="请输入" className="w-34!" />
      </Form.Item>
      <Form.Item
        name="soldCount"
        label="已售"
        tooltip={
          <div className="max-w-78">
            <p>
              为避免显示给用户的销售量过低, 可设置一个最小值。这样, 即使实际销售量较少,
              也可以让用户看到的销售量始终在一个合理的范围内。
            </p>
            <p>具体计算方式为：</p>
            <p>显示的销售量 = 最小值 + 实际销售量</p>
          </div>
        }
      >
        <InputNumber placeholder="请输入" className="w-34!" />
      </Form.Item>
      <Form.Item label="商品原价" name="originalPrice" rules={[{ required: true, message: '商品原价' }]}>
        <InputNumber className="!w-36" min={0} addonAfter="元" />
      </Form.Item>
      <Form.Item label="实际售价" required>
        <Space>
          <Form.Item noStyle name="price" rules={[{ required: true, message: '请输入商品实际售价' }]}>
            <InputNumber className="!w-36" min={0} addonAfter="元" />
          </Form.Item>
          {discount > 0 && (
            <span className="text-zinc-500 ml-2">
              <InfoCircleOutlined /> {discount}折
            </span>
          )}
        </Space>
      </Form.Item>
      <Form.Item name="isOnShelf" label="上架状态">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default memo(CustomForm)
