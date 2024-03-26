import React from 'react'

const Shop = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Shop {params.id}</h1>
    </div>
  )
}

export default Shop
