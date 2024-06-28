import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Shop } from '../types/Shop'
import { getDiscounts } from '../util/api/getDiscounts'
import DiscountList from './DiscountList'
import PostForm from './PostForm'
import ShopInfo from './ShopInfo'

type ShopDetailProps = {
  shop: Shop
  onBack: () => void
}

const ShopDetail = ({ shop, onBack }: ShopDetailProps) => {
  const [placeDetails, setPlaceDetails] = useState(null)
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    const getPlaceDetails = (placeId: string) => {
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

    // 割引情報を取得する
    const fetchDiscounts = async () => {
      try {
        const fetchedDiscounts = await getDiscounts(shop.place_id)
        console.log('割引情報:', fetchedDiscounts)
        if (Array.isArray(fetchedDiscounts)) {
          setDiscounts(fetchedDiscounts)
        } else {
          console.error('Fetched discounts is not an array:', fetchedDiscounts)
          setDiscounts([])
        }
      } catch (error) {
        console.error('割引情報取得エラー:', error)
        setDiscounts([])
      }
    }
    fetchDiscounts()
  }, [shop.place_id, shop.id])

  console.log('Rendering ShopDetail with discounts:', discounts)

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <button onClick={onBack} className="btn btn-secondary mb-4">
          戻る
        </button>
        {placeDetails ? (
          <>
            <ShopInfo placeDetails={placeDetails} />
            <DiscountList discounts={discounts} />
            <PostForm shop_id={shop.place_id} />
          </>
        ) : (
          <p>読み込み中...</p>
        )}
      </div>
    </div>
  )
}

export default ShopDetail
