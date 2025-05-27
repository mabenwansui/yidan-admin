import '@ant-design/v5-patch-for-react-19'
import { memo, useMemo, Ref, useImperativeHandle, useCallback } from 'react'
import Link from 'next/link'
import { Form, Input, Space, Tooltip, Switch } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { presets } from '@/common/constants/valid'
import { ROLE } from '@/common/constants/role'
import { ROUTE_PATH } from '@/common/constants/routePath'
import { StoreForm } from '@/common/types/store'
import ImgUpload from '@/components/Form/Upload/ImgUpload'
import SelectUser from '@/components/Form/SelectUser'
import SelectMapLocation from '@/components/Form/SelectMapLocation'

const { maxTitleLength } = presets

const label = { projectName: '店铺' }
export interface RefMethods {
  submit: () => void
  resetFields: () => void
}

interface Props {
  ref?: Ref<RefMethods>
  submitText?: string
  showSubmitBtn?: boolean
  onFinish?: (values: any) => void
  initialValues?: StoreForm
}

function CustomForm(props: Props) {
  const labelCol = useMemo(() => ({ span: 5 }), [])
  const wrapperCol = useMemo(() => ({ span: 19 }), [])
  const [form] = Form.useForm()
  const { onFinish, ref, initialValues } = props
  useImperativeHandle(
    ref,
    () => ({
      resetFields: () => form.resetFields(),
      submit: () => form.submit()
    }),
    [form]
  )
  const handleFinish = useCallback((values: any) => onFinish?.(values), [onFinish])
  return (
    <Form<StoreForm>
      form={form}
      initialValues={initialValues}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={handleFinish}
    >
      <Form.Item name="id" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item
        label={`${label.projectName}名称`}
        name="name"
        rules={[
          { required: true, message: `请输入${label.projectName}名称` },
          { max: maxTitleLength, message: `${label.projectName}名称不能超过${maxTitleLength}个字` }
        ]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label={`店长`}>
        <Space>
          <Form.Item name="owner" noStyle>
            <SelectUser className="w-91!" role={[ROLE.ADMIN]} />
          </Form.Item>
          <div>
            <Link href={ROUTE_PATH.USER_ADMIN_LIST} target="_blank" className="mr-1.5 ml-2">
              用户管理
            </Link>
            <Tooltip title="通过用户管理将用户设置为管理员, 再设置为店长">
              <QuestionCircleOutlined className="text-gray-400!" />
            </Tooltip>
          </div>
        </Space>
      </Form.Item>
      <Form.Item label={`${label.projectName}描述`} name="description">
        <Input.TextArea placeholder="请输入" rows={3} />
      </Form.Item>
      <Form.Item label={`${label.projectName}图片`} valuePropName="fileList" name="imgNames">
        <ImgUpload />
      </Form.Item>
      <Form.Item
        tooltip={`（不对用户显示）店铺的经纬度坐标, 用于计算店铺和用户之间的距离`}
        label={`${label.projectName}位置`}
        name="addressLocation"
        rules={[{ required: true, message: `请选择${label.projectName}位置` }]}
      >
        <SelectMapLocation />
      </Form.Item>
      <Form.Item
        tooltip={`用户界面上显示的店铺地址`}
        label={`地址`}
        name="details"
        rules={[{ required: true, message: `请输入地址` }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label={`营业状态`} name="open">
        <Switch />
      </Form.Item>
    </Form>
  )
}

export default memo(CustomForm)
