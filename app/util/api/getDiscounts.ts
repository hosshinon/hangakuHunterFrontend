export const getDiscounts = async (shop_place_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/discounts/${shop_place_id}`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      console.error('Failed to fetch shop details:', res.status, res.statusText)
      return []
    }

    const discounts = await res.json()
    console.log('Fetched discounts:', discounts)
    // 修正: APIからの応答が配列でない場合、配列に変換する
    return Array.isArray(discounts) ? discounts : [discounts]
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
