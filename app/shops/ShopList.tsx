import Link from 'next/link'
import React from 'react'
import { getAllShops } from '../util/api/getAllShops'

const ShopList = async () => {
  const shopList = await getAllShops()
  return (
    <div>
      <ul>
        {shopList.map((shop) => (
          <li key={shop.id}>
            <Link href={`/shops/${shop.id}`}>{shop.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopList
