import { Libraries } from '@react-google-maps/api'

// マップのスタイルを設定
export const containerStyle = {
  width: '100%',
  height: '50vh',
}
export const zoom = 16
export const InitPosition: google.maps.LatLngLiteral = {
  lat: 35.681236,
  lng: 139.767125,
}
export const InitRadius = 200
export const libraries: Libraries = ['places']
export const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
  ],
}
