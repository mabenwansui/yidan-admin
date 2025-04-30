import '@ant-design/v5-patch-for-react-19'
import { memo, useState, useMemo, Ref, useImperativeHandle, useCallback } from 'react'
import { Form, Input, Space, InputNumber, Switch } from 'antd'
import Link from 'next/link'
import { Branch } from '@/common/types/branch'
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
  initialValues?: Branch
}

function CustomForm(props: Props) {
  const { onFinish, ref, initialValues } = props
  const [curCommodity, setCurCommodity] = useState<Commodity>()
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  const [form] = Form.useForm()
  const { trigger: getCommodityInfo } = useGetCommodityInfoMutation()
  const _initialValues = useMemo(() => initialValues || {}, [initialValues])
  useImperativeHandle(
    ref,
    () => ({
      resetFields: () => form.resetFields(),
      submit: () => form.submit()
    }),
    [form]
  )
  const handleFinish = useCallback((values: any) => onFinish?.(values), [onFinish])
  const handleValuesChange = useCallback(
    async (changedValues: Branch) => {
      const { commodityId } = changedValues
      if (commodityId) {
        const { flag, data } = await getCommodityInfo({ id: commodityId })
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
      initialValues={_initialValues}
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
          <Form.Item name="commodityId" noStyle rules={[{ required: true, message: '请选择商品' }]}>
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
      <Form.Item label="实际售价">
        <Space>
          <Form.Item name="price" noStyle>
            <InputNumber placeholder="请输入" className="w-34!" />
          </Form.Item>
          {curCommodity?.originalPrice && (
            <div className="ml-2 text-text-secondary">(原价:{curCommodity.originalPrice})</div>
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
