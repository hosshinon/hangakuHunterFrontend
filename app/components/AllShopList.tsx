import Link from 'next/link'
import { Shop } from '../types/Shop'

const AllShopList = ({ shops }: { shops: Shop[] | undefined }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">割引情報が投稿されたスーパー</h2>
      {shops && shops.length > 0 ? (
        <ul className="space-y-2">
          {shops.map((shop) => (
            <li
              key={shop.place_id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 border-b border-gray-200"
            >
              <Link
                href={`/shop/${shop.place_id}`}
                className="flex items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{shop.name}</h3>
                  <p className="text-gray-600">{shop.formatted_address}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">
                    {shop.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({shop.user_ratings_total}件)
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">現在、表示するスーパーがありません。</p>
      )}
    </div>
  )
}

export default AllShopList
