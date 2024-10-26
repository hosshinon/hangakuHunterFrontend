import Image from 'next/image'
import React from 'react'
import { Shop } from '../types/Shop'
import { getPhotoUrl } from '../util/api/getPlaceDetails'

const ShopInfo = ({ placeDetails }: { placeDetails: Shop }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-96">
        {placeDetails.photos &&
        Array.isArray(placeDetails.photos) &&
        placeDetails.photos.length > 0 ? (
          <Image
            src={getPhotoUrl(placeDetails.photos[0].photo_reference)}
            alt={placeDetails.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-6xl text-gray-400">No Image</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">{placeDetails.name}</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-6">
          <span className="text-3xl text-yellow-400 mr-2">★</span>
          <span className="text-2xl font-semibold">
            {placeDetails.rating ? placeDetails.rating.toFixed(1) : 'N/A'}
          </span>
          <span className="text-lg text-gray-500 ml-2">
            ({placeDetails.user_ratings_total} レビュー)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start">
            <span className="text-2xl mr-3">📍</span>
            <p className="text-gray-700">{placeDetails.formatted_address}</p>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">📞</span>
            <a
              href={`tel:${placeDetails.international_phone_number}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {placeDetails.international_phone_number}
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">🌐</span>
            <a
              href={placeDetails.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              ウェブサイト
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">🕒</span>
            <span className="text-green-600 font-semibold text-lg">営業中</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">営業時間</h2>
          <ul className="text-gray-700 space-y-2">
            {placeDetails.opening_hours?.weekday_text.map((day, index) => (
              <li key={index} className="flex">
                <span className="font-medium w-20">{day.split(': ')[0]}:</span>
                <span>{day.split(': ')[1]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {placeDetails.types?.includes('restaurant') && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-red-100 text-red-800">
              🍽️ レストラン
            </span>
          )}
          {placeDetails.types?.includes('supermarket') && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-green-100 text-green-800">
              🛒 スーパーマーケット
            </span>
          )}
          {placeDetails.types?.includes('parking') && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-blue-100 text-blue-800">
              🅿️ 駐車場あり
            </span>
          )}
          {placeDetails.types?.includes('wheelchair_accessible') && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-purple-100 text-purple-800">
              ♿ バリアフリー
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopInfo
