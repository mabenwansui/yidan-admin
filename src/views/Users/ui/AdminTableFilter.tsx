import { memo } from 'react'
import { Form, Col, FormProps, SelectProps } from 'antd'
import TableFilterWrap, { Row } from '@/components/TableFilterWrap'
import SelectRole, { ValueType } from './SelectRole'

export interface FormValues {
  role: ValueType
}

function TableFilter(props: FormProps<FormValues>) {
  const [form] = Form.useForm()
  const handleSelectRoleChange: SelectProps['onChange'] = () => form.submit()
  return (
    <TableFilterWrap>
      <Form form={form} {...props}>
        <Row>
          <Col span={6}>
            <Form.Item name="role" label="角色筛选">
              <SelectRole style={{ width: 150 }} onChange={handleSelectRoleChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </TableFilterWrap>
  )
}

export default memo(TableFilter)
