//割引情報を削除する

export const deleteDiscount = async (shop_id: number, discount_id: number) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/shops/${shop_id}/discounts/${discount_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      `割引情報の削除に失敗しました: ${JSON.stringify(errorData)}`,
    )
  }
}
