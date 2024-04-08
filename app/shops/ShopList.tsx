import Link from 'next/link'
import React from 'react'
import { Shop } from '../types/Shop'
import { getAllShops } from '../util/api/getAllShops'

const ShopList = async () => {
  const shopList: Shop[] = await getAllShops()
  return (
    <div>
      <h1>店舗一覧</h1>
      <ul>
        {shopList.map((shop) => (
          <li key={shop.id}>
            <Link href={`/shops/${shop.id}`}>
              <h2>{shop.name}</h2>
              <p>住所: {shop.address}</p>
              {shop.discounts.length > 0 && (
                <div>
                  <h3>割引情報</h3>
                  <ul>
                    {shop.discounts.map((discount) => (
                      <li key={discount.id}>
                        <h4>{discount.title}</h4>
                        <p>{discount.description}</p>
                        <p>割引率: {discount.discount_rate}%</p>
                        <p>
                          期間:{' '}
                          {new Date(discount.start_time).toLocaleTimeString()}{' '}
                          から{' '}
                          {new Date(discount.end_time).toLocaleTimeString()}{' '}
                          まで
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopList
