import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          半額ハンター
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/" className="btn btn-ghost">
              検索
            </Link>
          </li>
          <li>
            <Link href="/" className="btn btn-ghost">
              ログイン
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
