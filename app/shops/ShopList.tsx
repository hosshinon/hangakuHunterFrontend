import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Shop } from '../types/Shop'
import { getAllShops } from '../util/api/getAllShops'

const ShopList = async () => {
  const shopList: Shop[] = await getAllShops()
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">店舗一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shopList.map((shop) => (
          <Link key={shop.id} href={`/shops/${shop.id}`}>
            <div className="card bg-base-100 shadow-xl h-full">
              <figure>
                <Image
                  src="/sample_shop.jpg"
                  alt="Sample Image"
                  width={500}
                  height={500}
                  objectFit="contain"
                />
              </figure>
              <div className="card-body h-full flex flex-col justify-between">
                <div>
                  <h2 className="card-title">{shop.name}</h2>
                  <p>{shop.address}</p>
                </div>
                {shop.discounts.length > 0 && (
                  <div className="badge badge-accent">割引情報あり</div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopList
