//割引情報を投稿するAPI
export const postDiscount = async (
  shop_id: string,
  title: string,
  start_time: string,
  end_time: string,
  discount_rate: number,
  description: string,
) => {
  // const startTime = new Date(`2000-01-01T${start_time}:00`).toISOString()
  // const endTime = new Date(`2000-01-01T${end_time}:00`).toISOString()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/discounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_id,
      title,
      start_time,
      end_time,
      discount_rate,
      description,
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
