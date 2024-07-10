import React, { useEffect, useState } from 'react'
import { Shop } from '../types/Shop'
import { getDiscounts } from '../util/api/getDiscounts'
import DiscountList from './DiscountList'
import PostForm from './PostForm'
import ShopInfo from './ShopInfo'

type ShopDetailProps = {
  shop: Shop
  onBack: () => void
}

const ShopDetail = ({ shop, onBack }: ShopDetailProps) => {
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    // 割引情報を取得する
    const fetchDiscounts = async () => {
      try {
        const fetchedDiscounts = await getDiscounts(shop.place_id)
        console.log('割引情報:', fetchedDiscounts)
        if (Array.isArray(fetchedDiscounts)) {
          setDiscounts(fetchedDiscounts)
        } else {
          console.error('Fetched discounts is not an array:', fetchedDiscounts)
          setDiscounts([])
        }
      } catch (error) {
        console.error('割引情報取得エラー:', error)
        setDiscounts([])
      }
    }
    fetchDiscounts()
  }, [shop.place_id, shop.id])

  console.log('Rendering ShopDetail with discounts:', discounts)

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <button onClick={onBack} className="btn btn-secondary mb-4">
          戻る
        </button>
        <ShopInfo shop_place_id={shop.place_id} />
        <DiscountList discounts={discounts} />
        <PostForm shop_place_id={shop.place_id} />
      </div>
    </div>
  )
}

export default ShopDetail
