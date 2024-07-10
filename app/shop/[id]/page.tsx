import React from 'react'
import DiscountList from '@/app/components/DiscountList'
import PostForm from '@/app/components/PostForm'
import ShopInfo from '@/app/components/ShopInfo'

const ShopPage = async ({ shop_place_id }: { params: { id: string } }) => {

  if (!shop_place_id) {
    return <div>店舗情報が見つかりませんでした。</div>
  }

  return (
    <div className="container mx-auto py-8">
      <ShopInfo placeDetails={placeDetails} />
      <DiscountList discounts={discounts} />
      <PostForm shop_place_id={shop.place_id} />
    </div>
  )
}

export default ShopPage
