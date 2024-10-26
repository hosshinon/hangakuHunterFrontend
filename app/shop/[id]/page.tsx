import React from 'react'
import DiscountList from '@/app/components/DiscountList'
import PostForm from '@/app/components/PostForm'
import ShopInfo from '@/app/components/ShopInfo'
import { getDiscounts } from '@/app/util/api/getDiscounts'
import { getPlaceDetails } from '@/app/util/api/getPlaceDetails'

const ShopPage = async ({ params }: { params: { id: string } }) => {
  const discounts = await getDiscounts(params.id)
  const placeDetails = (await getPlaceDetails(params.id)) || { photos: [] }
  return (
    <div className="container mx-auto py-8">
      <ShopInfo placeDetails={placeDetails} />
      <DiscountList discounts={discounts} />
      <PostForm placeId={params.id} placeDetails={placeDetails} />
    </div>
  )
}

export default ShopPage
