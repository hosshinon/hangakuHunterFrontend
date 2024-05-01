import { Shop } from '@/app/types/Shop'

export const getDetailShops = async (id: number): Promise<Shop | null> => {
  try {
    const res = await fetch(
      `http://host.docker.internal:3000/api/v1/shops/${id}`,
      {
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      console.error('Failed to fetch shop details:', res.status, res.statusText)
      return null
    }

    const shop = await res.json()
    console.log('Shop data:', shop)
    return shop
  } catch (error) {
    console.error('getDetailShop API error:', error)
    return null
  }
}
