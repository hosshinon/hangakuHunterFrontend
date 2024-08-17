import Image from 'next/image'
import React from 'react'
import { PlaceDetails } from '../types/PlaceDetail'
import { getPhotoUrl } from '../util/api/getPlaceDetails'

const ShopInfo = ({ placeDetails }: { placeDetails: PlaceDetails }) => {
  console.log('PlaceDetails data:', placeDetails)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {placeDetails.name}
        </h2>
        <p className="text-gray-600 mb-4">{placeDetails.formatted_address}</p>
        {placeDetails.photos && placeDetails.photos.length > 0 && (
          <div className="carousel w-full mb-4">
            {' '}
            {/* 変更: カルーセルコンポーネントを追加 */}
            {placeDetails.photos.map((photo, index) => (
              <div
                key={index}
                id={`slide${index}`}
                className="carousel-item relative w-full"
                style={{ aspectRatio: '4 / 3' }} // 変更: アスペクト比を統一
              >
                <Image
                  src={getPhotoUrl(photo.photo_reference)}
                  alt={placeDetails.name || '店舗画像'}
                  className="rounded-lg shadow-sm object-cover w-full h-full" // 変更: object-coverを追加
                  layout="fill" // 変更: 画像をコンテナにフィットさせる
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
        )}
        <a
          href={placeDetails.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
        >
          ウェブサイトを見る
        </a>
      </div>

      {placeDetails.opening_hours && (
        <div className="ml-8 flex-shrink-0 w-64">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">営業時間</h3>
          <ul className="space-y-1">
            {placeDetails.opening_hours.weekday_text.map((text, index) => (
              <li key={index} className="text-gray-700">
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ShopInfo
