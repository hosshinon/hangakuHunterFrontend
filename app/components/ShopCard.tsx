'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ShopCardProps = {
  supermarkets: google.maps.places.PlaceResult[]
}

// ShopCardコンポーネントの定義
const ShopCard = ({ supermarkets }: ShopCardProps) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">店舗一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {supermarkets.map((shop) => (
          // 各店舗へのリンクを作成
          <Link key={shop.place_id} href={`/shops/${shop.place_id}`}>
            <div className="card bg-base-100 shadow-xl h-full">
              <figure>
                <Image
                  // 店舗の写真を表示。写真が存在する場合はgetUrlメソッドを使用してURLを取得
                  src={
                    shop.photos && shop.photos.length > 0
                      ? shop.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
                      : ''
                  }
                  alt={shop.name} // 画像のalt属性に店舗名を設定
                  width={500} // 画像の幅を設定
                  height={500} // 画像の高さを設定
                  objectFit="contain" // 画像の表示方法を設定
                />
              </figure>
              <div className="card-body h-full flex flex-col justify-between">
                <div>
                  <h2 className="card-title">{shop.name}</h2>
                  <p>{shop.vicinity}</p>
                  <p>評価: {shop.rating}</p>
                  <p>
                    営業状況:
                    {shop.business_status === 'OPERATIONAL'
                      ? '営業中'
                      : '休業中'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ShopCard
