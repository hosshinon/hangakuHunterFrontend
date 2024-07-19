'use client'
import { useRouter } from 'next/navigation'
import { Discount } from '../types/Discount'
import { deleteDiscount } from '../util/api/deleteDiscount'

const DiscountList = ({ discounts }: { discounts: Discount[] }) => {
  const router = useRouter()

  //割引情報を削除する
  const handleDelete = async (id: number) => {
    try {
      console.log(id)
      await deleteDiscount(id)
      console.log('割引情報を削除しました')
      router.refresh()
    } catch (error) {
      console.error('削除中にエラーが発生しました:', error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">割引情報</h2>
      {discounts && discounts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {discounts.map((discount) => (
            <div key={discount.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h3 className="card-title">{discount.title}</h3>
                  <div className="badge badge-accent text-2xl">
                    割引率: {discount.discount_rate}%
                  </div>
                </div>
                <p>{discount.description}</p>
                <div>
                  <p>開始時間: {discount.start_time}</p>
                  <p>終了時間: {discount.end_time}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="btn btn-error btn-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>現在、この店舗には割引情報がありません。</p>
      )}
    </div>
  )
}

export default DiscountList
