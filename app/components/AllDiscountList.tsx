import React from 'react'
import { Discount } from '../types/Discount'

const AllDiscountList = ({
  discounts,
}: {
  discounts: Discount[] | undefined
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">全ての割引情報</h2>
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>現在、割引情報はありません。</p>
      )}
    </div>
  )
}

export default AllDiscountList
