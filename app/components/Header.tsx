import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="py-5 px-10 border-b-4 flex justify-between items-center ">
      <div>
        <h1 className="text-2xl font-extrabold">
          <Link href="/">半額ハンター</Link>
        </h1>
      </div>
      <div>
        <nav className="text-md font-medium">
          <Link className="px-3 py-3 bg-green-300 rounded-md" href="/">
            検索
          </Link>
        </nav>
      </div>
      <div>
        <nav className="text-md font-medium">
          <Link className="px-3 py-3 bg-green-300 rounded-md" href="/">
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
