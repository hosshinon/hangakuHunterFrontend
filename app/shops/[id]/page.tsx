import React from 'react'
import DiscountList from '@/app/components/DiscountList'
import PostForm from '@/app/components/PostForm'
import ShopInfo from '@/app/components/ShopInfo'
import { getDetailShops } from '@/app/util/api/getDiscounts'

const Shop = async ({ params }: { params: { id: number } }) => {
  const shop = await getDetailShops(params.id)

  if (!shop) {
    return <div>店舗情報が見つかりませんでした。</div>
  }

  return (
    <div className="container mx-auto py-8">
      <ShopInfo shop={shop} />
      <PostForm shop_id={params.id} />
      <DiscountList discounts={shop.discounts} shop_id={params.id} />
    </div>
  )
}

export default Shop
