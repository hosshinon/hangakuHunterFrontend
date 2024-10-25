'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ShopCardProps = {
  supermarkets: google.maps.places.PlaceResult[]
}

const ShopCard = ({ supermarkets }: ShopCardProps) => {
  return (
    <>
      {supermarkets.length === 0 ? (
        <div className="text-center mt-10 text-lg">
          <p>お店が見つかりませんでした！</p>
          <p>地図をタップしてね！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {supermarkets.map((shop) => (
            <Link
              href={`/shop/${shop.place_id}`}
              key={shop.place_id}
              className="block h-full"
            >
              <div className="card bg-base-100 shadow-xl h-full flex flex-col">
                <figure className="h-40 overflow-hidden">
                  <Image
                    src={
                      shop.photos && shop.photos.length > 0
                        ? shop.photos[0].getUrl({
                            maxWidth: 400,
                            maxHeight: 400,
                          })
                        : ''
                    }
                    alt={shop.name || ''}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="card-title text-base mb-2 line-clamp-1">
                      {shop.name}
                    </h2>
                    <p className="text-sm line-clamp-2">{shop.vicinity}</p>
                  </div>
                  <div className="mt-2 text-sm">
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
      )}
    </>
  )
}

export default ShopCard
