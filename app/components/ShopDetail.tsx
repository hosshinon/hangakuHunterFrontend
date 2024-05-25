import React from 'react'
import { Shop } from '../types/Shop'

type ShopDetailProps = {
  shop: Shop
  onBack: () => void
}

const ShopDetail = ({ shop, onBack }: ShopDetailProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <button onClick={onBack} className="btn btn-secondary mb-4">
          戻る
        </button>
        <h2 className="card-title">{shop.name}</h2>
        <p>{shop.address}</p>
        <p>評価: {shop.rating}</p>
        <p>
          営業時間: {shop.opening_hours?.weekday_text?.join(', ') || '情報なし'}
        </p>
      </div>
    </div>
  )
}

export default ShopDetail

// {/* <ShopInfo shop={shop} /> */}
// {/* <PostForm shop_id={params.id} /> */}
// {/* <DiscountList discounts={shop.discounts} shop_id={params.id} /> */}
