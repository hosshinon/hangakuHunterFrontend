export const getAllShops = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/shops`, {
      cache: 'no-store',
    })
    const allShops = await res.json()
    return allShops
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
