import React from 'react'
import { getDetailShops } from '@/app/util/api/getDetailShop'

const Shop = async ({ params }: { params: { id: string } }) => {
  const Shop = await getDetailShops(params.id)
  return (
    <div>
      <h1>Shop is {Shop.id}</h1>
      <h1>Name is {Shop.name}</h1>
      <h1>postal_code is {Shop.postal_code}</h1>
    </div>
  )
}

export default Shop
