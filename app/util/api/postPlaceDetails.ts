export const postPlaceDetails = async (
  place_id: string,
  name: string,
  rating: number,
  user_ratings_total: number,
  formatted_address: string,
  international_phoneNumber: string,
  website: string,
) => {
  const res = await fetch(`http://localhost:3000/api/v1/shops`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      place_id,
      name,
      rating,
      user_ratings_total,
      formatted_address,
      international_phoneNumber,
      website,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    console.error('APIリクエストエラー:', errorData)
    throw new Error(
      `割引情報の投稿に失敗しました: ${JSON.stringify(errorData)}`,
    )
  }
}
