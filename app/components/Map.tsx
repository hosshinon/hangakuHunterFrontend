'use client'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import React from 'react'

const containerStyle = {
  width: '100%',
  height: '50vh',
  '@media (min-width: 768px)': {
    height: '100vh',
  },
}
const center = {
  lat: 35.6804,
  lng: 139.769,
}

const zoom = 14

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      ></GoogleMap>
    </LoadScript>
  )
}

export default Map
