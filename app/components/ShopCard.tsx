import Image from 'next/image'
import React from 'react'
import { Shop } from '../types/Shop'

type ShopCardProps = {
  supermarkets: google.maps.places.PlaceResult[]
  onSelectShop: (shop: Shop) => void
}

const ShopCard = ({ supermarkets, onSelectShop }: ShopCardProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">店舗一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {supermarkets.map((shop) => (
          <div key={shop.place_id} onClick={() => onSelectShop(shop)}>
            <div className="card bg-base-100 shadow-xl h-full">
              <figure>
                <Image
                  src={
                    shop.photos && shop.photos.length > 0
                      ? shop.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
                      : ''
                  }
                  alt={shop.name}
                  width={500}
                  height={500}
                  objectFit="contain"
                />
              </figure>
              <div className="card-body h-full flex flex-col justify-between">
                <div>
                  <h2 className="card-title">{shop.name}</h2>
                  <p>{shop.vicinity}</p>
                  <p>評価: {shop.rating}</p>
                  <p>
                    営業状況:
                    {shop.opening_hours?.isOpen() ? '営業中' : '閉店中'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShopCard
