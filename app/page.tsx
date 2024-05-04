import Map from './components/Map'
import ShopList from './shops/ShopList'

export default function Home() {
  return (
    <div>
      <main className=" flex flex-col ">
        <div>
          <Map />
          <ShopList />
        </div>
      </main>
    </div>
  )
}
