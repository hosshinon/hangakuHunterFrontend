import ShopList from './shops/ShopList'

export default function Home() {
  return (
    <div>
      <main className=" flex flex-col ">
        <div>
          <h1>ここにMAPを置く</h1>
        </div>
        <div>
          <h1>SHOP LIST</h1>
          <ShopList />
        </div>
      </main>
    </div>
  )
}
