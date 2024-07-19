import React from 'react'
import DiscountList from '@/app/components/DiscountList'
import PostForm from '@/app/components/PostForm'
import ShopInfo from '@/app/components/ShopInfo'
import { getDiscounts } from '@/app/util/api/getDiscounts'
import { getPlaceDetails } from '@/app/util/api/getPlaceDetails'

const ShopPage = async ({ params }: { params: { id: string } }) => {
  // 割引情報を取得する

  console.log(`ショップコードを取得${params.id}`)
  const discounts = await getDiscounts(params.id)
  const placeDetails = await getPlaceDetails(params.id)
  return (
    <div className="container mx-auto py-8">
      <ShopInfo placeDetails={placeDetails} />
      <DiscountList discounts={discounts} />
      <PostForm shop_place_id={params.id} />
    </div>
  )
}

export default ShopPage
