import Image from 'next/image'
import React from 'react'
import { Shop } from '../types/Shop'

type ShopInfoProps = {
  shop: Shop
}

const ShopInfo = ({ shop }: ShopInfoProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <Image
          src={shop.imageUrl || '/sample_shop.jpg'}
          alt={shop.name}
          className="h-96 w-full object-cover"
          width={800}
          height={600}
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{shop.name}</h1>
        <p>{shop.address}</p>
        <p>{shop.postal_code}</p>
        <p>営業時間: {shop.opening_hours}</p>
        <p>
          ホームページ:{' '}
          {shop.homepage ? (
            <a
              href={shop.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              {shop.homepage}
            </a>
          ) : (
            'ホームページなし'
          )}
        </p>
      </div>
    </div>
  )
}

export default ShopInfo
