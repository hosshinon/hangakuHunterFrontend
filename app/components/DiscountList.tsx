import React from 'react'

type Discount = {
  id: number
  shop_id: string
  title: string
  start_time: string
  end_time: string
  discount_rate: number
  description: string
  created_at: string
  updated_at: string
}

type DiscountListProps = {
  discounts: Discount[]
}

const DiscountList = ({ discounts }: DiscountListProps) => {
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
                  <p>
                    開始時間:{' '}
                    {new Date(discount.start_time).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    終了時間:{' '}
                    {new Date(discount.end_time).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
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
