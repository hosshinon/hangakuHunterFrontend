// デフォルトの座標（東京の中心部）
const defaultCoordinates = { lat: 35.6762, lng: 139.6503 }

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // エラーまたは位置情報の取得拒否時にデフォルト位置を使用
          console.warn(
            'Failed to retrieve location. Using default coordinates.',
          )
          resolve(defaultCoordinates)
        },
        { timeout: 10000 }, // タイムアウト設定
      )
    }
  })
}
