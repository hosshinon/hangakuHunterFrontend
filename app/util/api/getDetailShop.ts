import { Shop } from '@/app/types/Shop'

//店舗詳細を取得するAPI
export const getDetailShops = async (id: string): Promise<Shop> => {
  try {
    const res = await fetch(
      `http://host.docker.internal:3000/api/v1/shops/${id}`,
      {
        cache: 'no-store',
      },
    )
    const Shop = await res.json()
    return Shop
  } catch (error) {
    console.error('getDetailShop API error:', error)
    throw error // エラーを再投げして、呼び出し元でキャッチできるようにする
  }
}
