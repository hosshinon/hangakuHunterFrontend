import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="navbar bg-base-100 rounded-box" data-theme="cupcake">
      <div className="flex justify-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          半額ハンター
        </Link>
        <p className="text-center text-sm">わりびき情報共有サイト</p>
      </div>
    </div>
  )
}

export default Header
