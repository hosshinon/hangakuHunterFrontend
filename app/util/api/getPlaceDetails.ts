export const getPlaceDetails = async (shop_place_id: string) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_address%2Cphotos%2Cplus_code%2Cwebsite%2Copening_hours&place_id=${shop_place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&output?json`,
    )
    console.log('PlaceDetails res:', res)
    const data = await res.json()
    console.log('PlaceDetails data:', data)
    return data.result
  } catch (error) {
    console.error('エラーが発生しました:', error)
    throw error
  }
}
export const getPhotoUrl = (photoReference: string, maxWidth: number = 400) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
}
