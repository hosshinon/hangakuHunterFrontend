'use client'
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { Discount } from '../types/Discount'
import { getAllDiscounts } from '../util/api/getAllDiscounts'
import AllDiscountList from './AllDiscountList'
import ShopCard from './ShopCard'

// マップのスタイルを設定
const containerStyle = {
  width: '100%',
  height: '50vh',
}
const zoom = 16
const InitPosition: google.maps.LatLngLiteral = {
  lat: 35.681236,
  lng: 139.767125,
}
const InitRadius = 200
const libraries = ['places']
const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      elementType: 'label',
      stylers: [{ visibility: 'off' }],
    },
  ],
}

// マップコンポーネント
const Map = () => {
  const [position, setPosition] =
    useState<google.maps.LatLngLiteral>(InitPosition)
  const [supermarkets, setSupermarkets] = useState<
    google.maps.places.PlaceResult[]
  >([])
  const [activeTab, setActiveTab] = useState('shops') // タブの状態を管理
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const pathname = usePathname()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
    language: 'ja',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    const fetchDiscounts = async () => {
      const data = await getAllDiscounts()
      console.log('取得した割引情報:', data)
      setDiscounts(data)
    }

    fetchDiscounts()
  }, [pathname])

  //周辺のスーパーマーケットを検索する
  const fetchNearbySupermarkets = (position: google.maps.LatLngLiteral) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    )
    const request = {
      location: new window.google.maps.LatLng(position.lat, position.lng),
      radius: InitRadius,
      language: 'ja',
      keyword: 'スーパーマーケット',
    }

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('Nearby search results:', results)
        setSupermarkets(results)
      } else {
        console.error('Nearby search failed:', status)
        setSupermarkets([])
      }
    })
  }

  //マップがクリックされた場所を取得
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition: google.maps.LatLngLiteral = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      setPosition(newPosition)
      fetchNearbySupermarkets(newPosition)
    }
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(InitPosition) // 初期位置を設定
    map.setZoom(zoom) // 初期ズームレベルを設定
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // MAP上にスーパーをマークするコンポーネント
  const LocationMarker = () => {
    const [selectedMarket, setSelectedMarket] =
      useState<google.maps.places.PlaceResult | null>(null) // 追加: 選択されたマーカーの状態を管理
    return (
      <>
        {supermarkets.map((market, index) =>
          market.geometry &&
          market.geometry.location &&
          market.geometry.location.lat() &&
          market.geometry.location.lng() ? (
            <Marker
              key={index}
              position={{
                lat: market.geometry.location.lat(),
                lng: market.geometry.location.lng(),
              }}
              onClick={() => setSelectedMarket(market)} // 追加: マーカーがクリックされたときに選択されたマーカーを設定
            />
          ) : null,
        )}
        {selectedMarket && ( // 追加: 選択されたマーカーがある場合にInfoWindowを表示
          <InfoWindow
            position={{
              lat: selectedMarket.geometry.location.lat(),
              lng: selectedMarket.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedMarket(null)} // 追加: InfoWindowを閉じるときに選択を解除
          >
            <div>
              <h2>{selectedMarket.name}</h2> {/* 追加: マーカーの名前を表示 */}
              <p>{selectedMarket.vicinity}</p>{' '}
              {/* 追加: マーカーの近くの場所を表示 */}
            </div>
          </InfoWindow>
        )}
      </>
    )
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={InitPosition}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {position && <LocationMarker />}
      </GoogleMap>
      <div
        role="tablist"
        className="tabs tabs-boxed flex justify-center space-x-4 mb-8"
      >
        <a
          role="tab"
          className={`tab ${activeTab === 'shops' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('shops')}
        >
          店舗一覧
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'discounts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('discounts')}
        >
          割引情報一覧
        </a>
      </div>
      {activeTab === 'shops' && <ShopCard supermarkets={supermarkets} />}
      {activeTab === 'discounts' && <AllDiscountList discounts={discounts} />}
    </div>
  ) : (
    <></>
  )
}

export default Map
