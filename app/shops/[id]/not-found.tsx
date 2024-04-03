import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>店舗が見つかりません</h2>
      <Link href="/">ホームに戻る</Link>
    </div>
  )
}
