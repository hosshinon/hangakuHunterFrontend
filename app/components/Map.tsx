/* eslint-disable import/order */
'use client'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  Circle,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLngTuple } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useState, useEffect } from 'react'
import { LoadScript } from '@react-google-maps/api'
import ShopCard from './ShopCard'
import { usePathname } from 'next/navigation'
import AllDiscountList from './AllDiscountList'
import { getAllDiscounts } from '../util/api/getAllDiscounts'
import { Discount } from '../types/Discount'

// デフォルトのアイコンURLを設定
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

// マップのスタイルを設定
const containerStyle = {
  width: '100%',
  height: '50vh',
}
const zoom = 16
const InitPosition: LatLngTuple = [35.681236, 139.767125]
const InitRadius = 200
const libraries = ['places']

// マップコンポーネント
const Map = () => {
  const [position, setPosition] = useState<LatLngTuple>(InitPosition)
  const [supermarkets, setSupermarkets] = useState<
    google.maps.places.PlaceResult[]
  >([])
  const [activeTab, setActiveTab] = useState('shops') // タブの状態を管理
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [key, setKey] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
    const fetchDiscounts = async () => {
      const data = await getAllDiscounts()
      console.log('取得した割引情報:', data) // デバッグ用にコンソールに出力
      setDiscounts(data)
    }

    fetchDiscounts()
  }, [pathname])

  // clickイベントから現在地を取得するコンポーネント
  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        const newPosition: LatLngTuple = [e.latlng.lat, e.latlng.lng]
        setPosition(newPosition)
        fetchNearbySupermarkets(newPosition)
      },
    })

    const fetchNearbySupermarkets = (position: LatLngTuple) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )
      const request = {
        location: new window.google.maps.LatLng(position[0], position[1]),
        radius: InitRadius,
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

    return position === null ? null : (
      <div>
        <Circle center={position} radius={500} />
        {supermarkets.map((market, index) =>
          market.geometry &&
          market.geometry.location &&
          market.geometry.location.lat() &&
          market.geometry.location.lng() ? (
            <Marker
              key={index}
              position={[
                market.geometry.location.lat(),
                market.geometry.location.lng(),
              ]}
            >
              <Popup>{market.name}</Popup>
            </Marker>
          ) : null
        )}
      </div>
    )
  }

  return (
    <div key={key}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <MapContainer center={InitPosition} zoom={zoom} style={containerStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </LoadScript>
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
  )
}

export default Map
