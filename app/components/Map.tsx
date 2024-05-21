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
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

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
const InitPosition = [35.681236, 139.767125]
const InitRadius = 200

// clickイベントから現在地を取得するコンポーネント
const LocationMarker = () => {
  const [position, setPosition] = useState(InitPosition)
  const [supermarkets, setSupermarkets] = useState([])

  const handleClick = (e) => {
    const newPosition = e.latlng
    setPosition(newPosition)
    fetchNearbySupermarkets(newPosition)
  }

  const fetchNearbySupermarkets = (position) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    )
    const request = {
      location: new window.google.maps.LatLng(position.lat, position.lng),
      radius: InitRadius,
      //type: ['supermarket'],
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

  useMapEvents({
    click: handleClick,
  })

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

// マップコンポーネント
const Map = () => {
  return (
    <div>
      <MapContainer center={InitPosition} zoom={zoom} style={containerStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          libraries={['places']}
        >
          <LocationMarker />
        </LoadScript>
      </MapContainer>
    </div>
  )
}

export default Map
