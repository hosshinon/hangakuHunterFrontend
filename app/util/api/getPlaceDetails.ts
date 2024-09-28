export const getPlaceDetails = async (shop_place_id: string) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${shop_place_id}&fields=name,rating,user_ratings_total,formatted_address,international_phone_number,website,opening_hours,price_level,photos,types&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ja`,
    )
    const data = await res.json()
    return data.result
  } catch (error) {
    console.error('エラーが発生しました:', error)
    throw error
  }
}
export const getPhotoUrl = (photoReference: string, maxWidth: number = 400) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
}
