//割引情報を削除する

export const deleteDiscount = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/v1/discounts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      `割引情報の削除に失敗しました: ${JSON.stringify(errorData)}`,
    )
  }
}
