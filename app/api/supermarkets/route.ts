import { NextResponse } from 'next/server'

export async function GET(request) {
  console.log('API called')
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  console.log(`Lat: ${lat}, Lng: ${lng}`)
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  const radius = 1500 // 1.5kmの範囲内
  const type = 'supermarket'
  const url = `${baseUrl}?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`

  try {
    const response = await fetch(url)
    const responseText = await response.text() // レスポンスをテキストとして取得
    console.log('Response Text:', responseText) // レスポンスの内容をログに出力

    // レスポンスがJSON形式であるかどうかを確認
    try {
      const jsonResponse = JSON.parse(responseText)
      if (!response.ok) {
        console.error('Failed to fetch supermarkets:', jsonResponse)
        return NextResponse.json(
          { error: 'Failed to fetch supermarkets' },
          { status: response.status }
        )
      }
      return NextResponse.json(jsonResponse.results)
    } catch (jsonError) {
      console.error('Response is not JSON:', responseText)
      return NextResponse.json(
        { error: 'Response is not JSON' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching supermarkets', error)
    return NextResponse.json(
      { error: 'Error fetching supermarkets' },
      { status: 500 }
    )
  }
}
