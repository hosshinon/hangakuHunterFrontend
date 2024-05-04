'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Discount } from '../types/Discount'
import { deleteDiscount } from '../util/api/deleteDiscount'

type DiscountListProps = {
  shop_id: number
  discounts: Discount[]
}

const DiscountList = ({ shop_id, discounts }: DiscountListProps) => {
  const router = useRouter()

  const handleDelete = async (shop_id: number, discount_id: number) => {
    if (confirm('削除してもよろしいですか？')) {
      try {
        await deleteDiscount(shop_id, discount_id)
        router.refresh()
      } catch (error) {
        console.error('割引情報の削除に失敗しました:', error)
        alert('割引情報の削除に失敗しました。')
      }
    }
  }

  return (
    <>
      <div className="divider"></div>
      <h2 className="card-title">割引情報</h2>
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
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      開始時間:{' '}
                      {new Date(discount.start_time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p>
                      終了時間:{' '}
                      {new Date(discount.end_time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(shop_id, discount.id)}
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
    </>
  )
}

export default DiscountList
