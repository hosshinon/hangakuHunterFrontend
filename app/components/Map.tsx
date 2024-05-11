'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'
import { getCurrentPosition } from '../util/api/Map/getCurrentPosition'

// Google Mapsの表示位置
const containerStyle = {
  width: '100%',
  height: '50vh',
  '@media (min-width: 768px)': {
    height: '100vh',
  },
}
const initialCenter = {
  lat: 35.6804,
  lng: 139.769,
}
const zoom = 14

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(initialCenter)

  useEffect(() => {
    getCurrentPosition()
      .then((coords) => {
        setCurrentPosition(coords)
      })
      .catch((error) => {
        console.error('Error getting location:', error)
      })
  }, [])

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={zoom}
        >
          {/* 現在位置のマーカー */}
          {currentPosition.lat && <Marker position={currentPosition} />}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default Map
