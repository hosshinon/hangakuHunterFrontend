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

// clickイベントから現在地を取得するコンポーネント
const LocationMarker = () => {
  const [position, setPosition] = useState(InitPosition)
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })

  return position === null ? null : (
    <div>
      <Marker position={position}>
        <Popup>中心はここです</Popup>
      </Marker>
      <Circle center={position} radius={500} />
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
        {/* クリックした場所を取得する */}
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map
