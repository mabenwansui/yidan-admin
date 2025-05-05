'use client'
import { useRef } from 'react'
import { Row, Col } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { ROUTE_PATH } from '@/common/constants/routePath'
import Loading from '@/components/Loading/Component'
import { PrimaryBtn } from '@/components/Button'
import useGetCommodityInfo, { FORMAT_TYPE } from '../../_hooks/useGetCommodityInfo'
import useUpdateCommodity from '../../_hooks/useUpdateCommodity'
import Form, { RefMethods, CommoditySubmitValues } from '../../_ui/CommodityForm/Form'

export default function CommodityEditPage() {
  const { id } = useParams()
  const formRef = useRef<RefMethods>(null)
  const router = useRouter()
  const { trigger: update } = useUpdateCommodity()
  const { data, isLoading } = useGetCommodityInfo({ commodityId: id as string, format: FORMAT_TYPE.FORM })
  const handleDrawerSubmit = () => formRef.current?.submit()
  const handleFinish = async (values: CommoditySubmitValues) => {
    const { category, imgNames, ...rest } = values
    const { flag } = await update({
      category: category?.value,
      imgNames: imgNames?.map((item) => item.name) || [],
      ...rest
    })
    if (flag === 1) {
      router.push(ROUTE_PATH.COMMODITY_SUCCESS_EDIT)
    }
  }
  return (
    <section className="form-wrap">
      {isLoading === true ? (
        <Loading />
      ) : (
        <section>
          <Form ref={formRef} initialValues={data} onFinish={handleFinish} showSubmitBtn={false} />
          <Row>
            <Col offset={5}>
              <PrimaryBtn onClick={handleDrawerSubmit}>更新</PrimaryBtn>
            </Col>
          </Row>
        </section>
      )}
    </section>
  )
}
