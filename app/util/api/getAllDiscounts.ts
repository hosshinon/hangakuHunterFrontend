export const getAllDiscounts = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/discounts`, {
      cache: 'no-store',
    })
    const allDiscounts = await res.json()
    return allDiscounts
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
