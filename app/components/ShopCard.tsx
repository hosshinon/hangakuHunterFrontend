import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ShopCardProps = {
  supermarkets: google.maps.places.PlaceResult[]
}

const ShopCard = ({ supermarkets }: ShopCardProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {supermarkets.map((shop) => (
          <Link href={`/shop/${shop.place_id}`} key={shop.place_id}>
            <div className="card bg-base-100 shadow-xl h-full">
              <figure>
                <Image
                  src={
                    shop.photos && shop.photos.length > 0
                      ? shop.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
                      : '/public/sample_shop.jpg' // デフォルト画像のパス
                  }
                  alt={shop.name}
                  width={400}
                  height={400}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '180px',
                  }}
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
          </Link>
        ))}
      </div>
    </>
  )
}

export default ShopCard
