import { notFound } from 'next/navigation'
import React from 'react'
import { Discount } from '@/app/types/Discount'
import { getDetailShops } from '@/app/util/api/getDetailShop'

const Shop = async ({ params }: { params: { id: string } }) => {
  try {
    const shop = await getDetailShops(params.id)
    return (
      <div>
        <h1>{shop.name}</h1>
        <p>住所: {shop.address}</p>
        <p>郵便番号: {shop.postal_code}</p>
        <p>営業時間: {shop.opening_hours}</p>
        <p>
          ホームページ:{' '}
          <a href={shop.homepage} target="_blank" rel="noopener noreferrer">
            {shop.homepage}
          </a>
        </p>
        <p>緯度: {shop.latitude}</p>
        <p>経度: {shop.longitude}</p>

        <h2>割引情報</h2>
        {shop.discounts.length > 0 ? (
          <ul>
            {shop.discounts.map((discount: Discount) => (
              <li key={discount.id}>
                <h3>{discount.title}</h3>
                <p>{discount.description}</p>
                <p>
                  開始日: {new Date(discount.start_time).toLocaleTimeString()}
                </p>
                <p>
                  終了日: {new Date(discount.end_time).toLocaleTimeString()}
                </p>
                <p>割引率: {discount.discount_rate}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>現在、この店舗には割引情報がありません。</p>
        )}
      </div>
    )
  } catch (error) {
    notFound()
  }
}

export default Shop
