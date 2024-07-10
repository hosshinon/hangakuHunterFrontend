import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PlaceDetails } from '../types/PlaceDetail'

const ShopInfo = ({ shop_place_id }: { shop_place_id: string }) => {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getPlaceDetails = async (placeId: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const place = new google.maps.places.PlacesService(
          document.createElement('div')
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
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            setPlaceDetails({
              name: place.name,
              formatted_address: place.formatted_address,
              photos: place.photos,
              plus_code: place.plus_code,
              website: place.website,
              opening_hours: place.opening_hours,
            })
          } else {
            setError('店舗情報の取得に失敗しました')
          }
          setIsLoading(false)
        })
      } catch (err) {
        setError('エラーが発生しました')
        setIsLoading(false)
      }
    }

    if (shop_place_id) {
      getPlaceDetails(shop_place_id)
    }
  }, [shop_place_id])

  if (isLoading) {
    return <div>読み込み中...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!placeDetails) {
    return <div>店舗情報が見つかりませんでした</div>
  }

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
              src={placeDetails.photos[0].getUrl()}
              alt={placeDetails.name}
              className="rounded-lg shadow-sm"
              width={400}
              height={300}
              objectFit="cover"
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
