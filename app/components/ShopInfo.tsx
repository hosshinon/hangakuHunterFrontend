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
          <div className="mb-4">
            <Image
              src={getPhotoUrl(placeDetails.photos[0].photo_reference)}
              alt={placeDetails.name || '店舗画像'}
              className="rounded-lg shadow-sm cover"
              width={400}
              height={300}
            />
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
