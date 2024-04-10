//割引情報を投稿するAPI
export const postDiscount = async (
  shop_id: number,
  start_time: string,
  end_time: string,
  discount_rate: number,
  description: string
) => {
  const startTime = new Date(`2000-01-01T${start_time}:00`)
  const endTime = new Date(`2000-01-01T${end_time}:00`)
  const res = await fetch(
    `http://host.docker.internal:3000/api/v1/shops/${shop_id}/discounts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        discount_rate,
        description,
      }),
    }
  )

  if (!res.ok) {
    throw new Error('エラーが発生しました')
  }
}
