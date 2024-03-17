import React from 'react'
import { getAllShops } from '../util/api/getAllShops'

const ShopList = async () => {
  const shopList = await getAllShops()

  return (
    <div>
      <ul>
        {shopList.map((shop) => (
          <li key={shop.id}>
            {shop.name}
            {shop.postal_code}
            {shop.address}
            {shop.opening_hours}
            {shop.homepage}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopList
