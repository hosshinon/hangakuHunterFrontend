import React from 'react'
import { Discount } from '../types/Discount'

type DiscountListProps = {
  discounts: Discount[]
}

const DiscountList = ({ discounts }: DiscountListProps) => {
  return (
    <>
      <div className="divider"></div>
      <h2 className="card-title">割引情報</h2>
      {discounts && discounts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {discounts.map((discount) => (
            <div key={discount.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{discount.title}</h3>
                <p>{discount.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      開始日: {new Date(discount.start_time).toLocaleString()}
                    </p>
                    <p>
                      終了日: {new Date(discount.end_time).toLocaleString()}
                    </p>
                  </div>
                  <div className="badge badge-accent">
                    割引率: {discount.discount_rate}%
                  </div>
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
