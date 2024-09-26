export const getDiscounts = async (shop_place_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_INTERNAL}/discounts/${shop_place_id}`,
      {
        cache: 'no-store',
      },
    )
    const discounts = await res.json()
    return discounts
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
