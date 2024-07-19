export const getDiscounts = async (shop_place_id: string) => {
  try {
    console.log('getDiscountを実行しました')
    const res = await fetch(
      `http://host.docker.internal:3000/api/v1/discounts/${shop_place_id}`,
      {
        cache: 'no-store',
      },
    )
    const discounts = await res.json()
    // 修正: APIからの応答が配列でない場合、配列に変換する
    return discounts
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
