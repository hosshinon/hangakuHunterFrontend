import Image from 'next/image'
import React from 'react'
import { Shop } from '../types/Shop'
import { getPhotoUrl } from '../util/api/getPlaceDetails'
const ShopInfo = ({ placeDetails }: { placeDetails: Shop }) => {
  return (
    <div>
      <div className=" mx-auto bg-white overflow-hidden">
        <div className="relative h-96">
          {placeDetails.photos && placeDetails.photos.length > 0 ? (
            <div className="carousel w-full">
              {placeDetails.photos.map((photo, index) => (
                <div
                  key={index}
                  id={`slide${index}`}
                  className="carousel-item relative w-full h-96"
                >
                  <Image
                    src={getPhotoUrl(photo.photo_reference)}
                    alt={placeDetails.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a
                      href={`#slide${index === 0 ? placeDetails.photos.length - 1 : index - 1}`}
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${index === placeDetails.photos.length - 1 ? 0 : index + 1}`}
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl text-gray-400">📷</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h1 className="text-2xl font-bold text-white">
              {placeDetails.name}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl text-yellow-400 mr-1">★</span>
            <span className="text-lg font-semibold">
              {placeDetails.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              ({placeDetails.user_ratings_total} レビュー)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <span className="text-xl mr-2">📍</span>
              <p>{placeDetails.formatted_address}</p>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">📞</span>
              <a
                href={`tel:${placeDetails.international_phone_number}`}
                className="text-blue-600 hover:underline"
              >
                {placeDetails.international_phone_number}
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">🌐</span>
              <a
                href={placeDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ウェブサイト
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">🕒</span>
              <span className="text-green-600 font-semibold">営業中</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">営業時間</h2>
            <ul className="text-sm text-gray-600">
              {placeDetails.opening_hours?.weekday_text.map((day, index) => (
                <li key={index} className="mb-1">
                  {day}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {placeDetails.types?.includes('restaurant') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                🍽️ レストラン
              </span>
            )}
            {placeDetails.types?.includes('supermarket') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                🛒 スーパーマーケット
              </span>
            )}
            {placeDetails.types?.includes('parking') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                🅿️ 駐車場あり
              </span>
            )}
            {placeDetails.types?.includes('wheelchair_accessible') && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                ♿ バリアフリー
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopInfo
