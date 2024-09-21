import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-[var(--color-light-green)] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🥕</span>
            <div>
              <h1 className="text-2xl font-bold text-white">半額ハンター</h1>
              <p className="text-sm text-[var(--color-cream)]">
                わりびき情報共有サイト
              </p>
            </div>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-[var(--color-cream)] transition-colors"
                >
                  ホーム
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
