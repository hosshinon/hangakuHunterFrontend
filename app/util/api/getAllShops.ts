import { Shop } from '@/app/types/Shop'

//店舗一覧を取得するAPI
export const getAllShops = async (): Promise<Shop[]> => {
  try {
    const res = await fetch('http://host.docker.internal:3000/api/v1/shops', {
      cache: 'no-store',
    })
    const Shops = await res.json()
    return Shops
  } catch (error) {
    console.error('getAllShops API error:', error)
    throw error // エラーを再投げして、呼び出し元でキャッチできるようにする
  }
}
