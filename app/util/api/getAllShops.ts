export const getAllShops = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops`, {
      cache: 'no-store',
    })
    const allShops = await res.json()
    return allShops
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return []
  }
}
