import Map from './components/Map'
import ShopList from './shops/ShopList'

export default function Home() {
  return (
    <div>
      <main className="container mx-auto ">
        <div className="w-full">
          <Map />
        </div>
        <div className="w-full">
          <ShopList />
        </div>
      </main>
    </div>
  )
}
