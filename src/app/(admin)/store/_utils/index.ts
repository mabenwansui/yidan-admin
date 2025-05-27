import { Store, StoreForm } from '@/common/types/store'

export function StoreToStoreForm(store: Store): StoreForm {
  const { lon, lat, city, poiName, poiAddress, owner, ...rest } = store
  return {
    ...rest,
    owner: owner?.map((item) => item.id),
    addressLocation: {
      poiName,
      poiAddress,
      city,
      lon,
      lat
    }
  }
}
