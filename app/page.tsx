import ShopList from './feature/ShopList'

export default function Home() {
  return (
    <div>
      <main className=" flex flex-col ">
        <div>
          <h1>ここにMAPを置く</h1>
        </div>
        <div>
          <h1>ここに店舗リストを置く</h1>
          <ShopList />
        </div>
      </main>
    </div>
  )
}
