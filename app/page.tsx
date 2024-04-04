import ShopList from './shops/ShopList'

export default function Home() {
  return (
    <div>
      <main className=" flex flex-col ">
        <div>
          <ShopList />
        </div>
      </main>
    </div>
  )
}
