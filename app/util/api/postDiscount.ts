//割引情報を投稿するAPI
export const postDiscount = async (
  shop_id: number,
  start_time: string,
  end_time: string,
  discount_rate: number,
  description: string,
) => {
  const res = await fetch(
    `http://host.docker.internal:3000/api/v1/shops/${shop_id}/discounts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_time,
        end_time,
        discount_rate,
        description
      }),
    }
  )

  if (!res.ok) {
    throw new Error('エラーが発生しました')
  }
}
