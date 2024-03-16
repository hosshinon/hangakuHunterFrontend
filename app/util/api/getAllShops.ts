//店舗一覧取得するAPI
export const getAllShops = async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/shops', {
      cache: 'no-store',
    })
    console.log(res)
    const Shops = await res.json()
    return Shops
  } catch (error) {
    console.error('getAllShops API error:', error)
    throw error // エラーを再投げして、呼び出し元でキャッチできるようにする
  }
}