import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Shop } from '../types/Shop'

type ShopDetailProps = {
  shop: Shop
  onBack: () => void
}

const ShopDetail = ({ shop, onBack }: ShopDetailProps) => {
  const [placeDetails, setPlaceDetails] = useState(null)

  useEffect(() => {
    const getPlaceDetails = (placeId: string) => {
      const place = new google.maps.places.PlacesService(
        document.createElement('div'),
      )
      const request = {
        placeId: placeId,
        language: 'ja',
        fields: [
          'name',
          'formatted_address',
          'photos',
          'plus_code',
          'website',
          'opening_hours',
        ],
      }
      place.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log('Details request result', place)
          setPlaceDetails({
            name: place.name,
            formatted_address: place.formatted_address,
            photos: place.photos,
            plus_code: place.plus_code,
            website: place.website,
            opening_hours: place.opening_hours,
          })
        } else {
          console.error('Details request failed:', status)
          setPlaceDetails(null)
        }
      })
    }

    if (shop.place_id) {
      getPlaceDetails(shop.place_id)
    }
  }, [shop.place_id])

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <button onClick={onBack} className="btn btn-secondary mb-4">
          戻る
        </button>
        {placeDetails ? (
          <>
            <h2 className="card-title text-2xl font-bold">
              {placeDetails.name}
            </h2>
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
                  {placeDetails.opening_hours.weekday_text.map(
                    (text, index) => (
                      <li key={index} className="text-gray-700">
                        {text}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p>読み込み中...</p>
        )}
      </div>
    </div>
  )
}

export default ShopDetail
