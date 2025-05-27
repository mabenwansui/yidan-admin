import React, { useEffect, useState } from 'react'
import { Modal, ModalProps, App } from 'antd'
import { AddressLocationSelect } from '@/common/types/address'

interface MapData {
  module: 'locationPicker'
  cityname: string
  poiname: string
  poiaddress: string
  latlng: {
    lat: number
    lng: number
  }
}

interface Props extends Omit<ModalProps, 'onOk'> {
  onOk?: (params: AddressLocationSelect) => void
}

export default function SelectMapLocationModal(props: Props) {
  const [mapData, setMapData] = useState<MapData>()
  const { message } = App.useApp()
  const { onOk, ...rest } = props
  const url = `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${process.env.NEXT_PUBLIC_TENCENT_MAP_KEY}&referer=address`
  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        const loc = event.data
        if (loc && loc.module == 'locationPicker') {
          setMapData(loc as MapData)
        }
      },
      false
    )
  }, [])
  const handleOk = () => {
    if (mapData) {
      onOk?.({
        poiAddress: mapData.poiaddress,
        poiName: mapData.poiname,
        city: mapData.cityname,
        lon: mapData.latlng.lng,
        lat: mapData.latlng.lat
      })
    } else {
      message.info('请在地图下方列表中选择一个地址')
    }
  }
  return (
    <Modal width={700} onOk={handleOk} {...rest}>
      <div className="w-full h-140">
        <iframe id="mapPage" allow="geolocation" width="100%" height="100%" className="border-none" src={url}></iframe>
      </div>
    </Modal>
  )
}
