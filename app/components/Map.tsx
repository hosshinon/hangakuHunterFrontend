'use client'
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from '@react-google-maps/api'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useCallback } from 'react'
import { Shop } from '../types/Shop'
import { getAllShops } from '../util/api/getAllShops'
import AllShopList from './AllShopList'
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
      elementType: 'all',
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
  const [activeTab, setActiveTab] = useState('shops')
  const [shops, setShops] = useState<Shop[]>([])
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
      const data = await getAllShops()
      setShops(data)
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
    map.setCenter(InitPosition)
    map.setZoom(zoom)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // MAP上にスーパーをマークするコンポーネント
  const LocationMarker = () => {
    const [selectedMarket, setSelectedMarket] =
      useState<google.maps.places.PlaceResult | null>(null)
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
              onClick={() => setSelectedMarket(market)}
            />
          ) : null,
        )}
        {selectedMarket && (
          <InfoWindow
            position={{
              lat: selectedMarket.geometry.location.lat(),
              lng: selectedMarket.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedMarket(null)}
          >
            <div>
              <h2>{selectedMarket.name}</h2>
              <p>{selectedMarket.vicinity}</p>{' '}
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
      <div className="mt-4">
        <div
          role="tablist"
          className="tabs tabs-boxed flex justify-center space-x-4 mb-2"
        >
          <a
            role="tab"
            className={`tab text-lg ${activeTab === 'shops' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('shops')}
          >
            検索結果
          </a>
          <a
            role="tab"
            className={`tab text-lg ${activeTab === 'discounts' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('discounts')}
          >
            投稿済み一覧
          </a>
        </div>
        {activeTab === 'shops' && <ShopCard supermarkets={supermarkets} />}
        {activeTab === 'discounts' && <AllShopList shops={shops} />}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Map
