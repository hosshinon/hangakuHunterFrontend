import React, { useState } from 'react'
import { Shop } from '../types/Shop'
import ShopCard from './ShopCard'
import ShopDetail from './ShopDetail'

type ShopContainerProps = {
  supermarkets: google.maps.places.PlaceResult[]
}

const ShopContainer = ({ supermarkets }: ShopContainerProps) => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  return (
    <div className="container mx-auto py-8">
      {selectedShop ? (
        <ShopDetail shop={selectedShop} onBack={() => setSelectedShop(null)} />
      ) : (
        <ShopCard supermarkets={supermarkets} onSelectShop={setSelectedShop} />
      )}
    </div>
  )
}

export default ShopContainer
