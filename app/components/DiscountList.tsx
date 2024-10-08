'use client'
import { useRouter } from 'next/navigation'
import { Discount } from '../types/Discount'
import { deleteDiscount } from '../util/api/deleteDiscount'

const DiscountList = ({ discounts }: { discounts: Discount[] }) => {
  const router = useRouter()

  const handleDelete = async (id: number) => {
    try {
      await deleteDiscount(id)
      router.refresh()
    } catch (error) {
      console.error('削除中にエラーが発生しました:', error)
    }
  }

  const formatTime = (dateString: string) => {
    const [, timePart] = dateString.split('T')
    const [hours, minutes] = timePart.split(':')
    return `${hours}:${minutes}`
  }

  return (
    <div className="p-4 bg-[var(--color-soft-blue)] rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-dark-green)]">
        🥬 今日のお買い得情報 🛒
      </h2>
      {discounts && discounts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body p-6">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl mb-2 flex-1 mr-2 text-[var(--color-dark-green)]">
                    {discount.title}
                  </h3>
                  <div className="badge bg-[var(--color-fresh-green)] text-white badge-lg text-lg font-bold animate-pulse p-4 flex flex-col items-center justify-center min-w-[100px] h-[100px]">
                    <span className="text-3xl">{discount.discount_rate}%</span>
                    <span>OFF</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{discount.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="mr-2">⏰</span>
                    <span>開始: {formatTime(discount.start_time)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">⏰</span>
                    <span>終了: {formatTime(discount.end_time)}</span>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white btn-sm gap-2"
                  >
                    🗑️ 削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert bg-[var(--color-light-green)] text-white">
          <span className="mr-2">ℹ️</span>
          <span>現在、この店舗には割引情報がありません。</span>
        </div>
      )}
    </div>
  )
}

export default DiscountList
