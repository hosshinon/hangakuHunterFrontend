import Image from 'next/image'
import React from 'react'

const ShopInfo = ({ placeDetails }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <h2 className="card-title text-2xl font-bold">{placeDetails.name}</h2>
      <p className="text-gray-600">{placeDetails.formatted_address}</p>
      {placeDetails.photos && placeDetails.photos.length > 0 && (
        <div className="my-4">
          <Image
            src={placeDetails.photos[0].getUrl()}
            alt={placeDetails.name}
            className="rounded-lg shadow-lg"
            width={400}
            height={300}
          />
        </div>
      )}
      <p className="text-blue-500">
        ウェブサイト:{' '}
        <a
          href={placeDetails.website}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {placeDetails.website}
        </a>
      </p>
      {placeDetails.opening_hours && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">営業時間:</h3>
          <ul className="list-disc list-inside">
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
