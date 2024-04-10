import React from 'react'
import PostForm from '@/app/components/PostForm'
import { Discount } from '@/app/types/Discount'
import { getDetailShops } from '@/app/util/api/getDetailShop'

const Shop = async ({ params }: { params: { id: number } }) => {
  const shop = await getDetailShops(params.id)

  if (!shop) {
    return <div>店舗情報が見つかりませんでした。</div>
  }

  return (
    <div>
      <div>
        <h1>{shop.name ?? 'ショップ名なし'}</h1>
        <p>住所: {shop.address ?? '住所なし'}</p>
        <p>郵便番号: {shop.postal_code ?? '郵便番号なし'}</p>
        <p>営業時間: {shop.opening_hours ?? '営業時間なし'}</p>
        <p>
          ホームページ:{' '}
          {shop.homepage ? (
            <a href={shop.homepage} target="_blank" rel="noopener noreferrer">
              {shop.homepage}
            </a>
          ) : (
            'ホームページなし'
          )}
        </p>
        <p>緯度: {shop.latitude ?? '緯度なし'}</p>
        <p>経度: {shop.longitude ?? '経度なし'}</p>
        <h2>割引情報</h2>
        {shop.discounts &&
        Array.isArray(shop.discounts) &&
        shop.discounts.length > 0 ? (
          <ul>
            {shop.discounts.map((discount: Discount) => (
              <li key={discount.id}>
                <h3>{discount.title}</h3>
                <p>{discount.description}</p>
                <p>
                  開始日: {new Date(discount.start_time).toLocaleTimeString()}{' '}
                  から 終了日:{' '}
                  {new Date(discount.end_time).toLocaleTimeString()}まで
                </p>
                <p>割引率: {discount.discount_rate}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>現在、この店舗には割引情報がありません。</p>
        )}
      </div>
      <PostForm shop_id={params.id} />
    </div>
  )
}

export default Shop
