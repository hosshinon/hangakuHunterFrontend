// Map.js
'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'
import { getNearbySupermarkets } from '../util/api/Map/getNearbySupermarkets'
import { getUserPosition } from '../util/api/Map/getUserPosition'

const containerStyle = {
  width: '100%',
  height: '50vh',
  '@media (min-width: 768px)': {
    height: '100vh',
  },
}
const zoom = 14

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 35.6804,
    lng: 139.769,
  })
  const [supermarkets, setSupermarkets] = useState([])

  useEffect(() => {
    getUserPosition()
      .then((coords) => {
        setCurrentPosition(coords)
        return getNearbySupermarkets(coords.lat, coords.lng)
      })
      .then((supermarkets) => {
        setSupermarkets(supermarkets)
      })
      .catch((error) => {
        console.error('Error getting location or supermarkets:', error)
      })
  }, [])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={zoom}
      >
        {supermarkets.map((supermarket, index) => (
          <Marker
            key={index}
            position={{
              lat: supermarket.geometry.location.lat,
              lng: supermarket.geometry.location.lng,
            }}
            //ラベル名をスーパーマーケットの名前に設定
            label={supermarket.name}
            //大きさを変更
						icon={{
							url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
							scaledSize: new window.google.maps.Size(32, 32),
						}}
          />
        ))}
        {currentPosition.lat && (
          <Marker position={currentPosition} label="You are here" />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
