'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Shop } from '../types/Shop'
import { postDiscount } from '../util/api/postDiscount'
import { postPlaceDetails } from '../util/api/postPlaceDetails'

const PostForm = ({
  placeId,
  placeDetails,
}: {
  placeId: string
  placeDetails: Shop
}) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [start_time, setStart_time] = useState<string>('')
  const [end_time, setEnd_time] = useState<string>('')
  const [discount_rate, setDiscount_rate] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await postPlaceDetails(
        placeId,
        placeDetails.name,
        placeDetails.rating,
        placeDetails.user_ratings_total,
        placeDetails.formatted_address,
        placeDetails.international_phone_number,
        placeDetails.website,
      )
      await postDiscount(
        placeId,
        title,
        start_time,
        end_time,
        discount_rate,
        description,
      )
      setTitle('')
      setStart_time('')
      setEnd_time('')
      setDiscount_rate(0)
      setDescription('')
      router.refresh()
    } catch (error) {
      console.error('投稿エラー:', error)
      alert(`フェッチに失敗しました: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-[var(--color-light-green)] text-white p-6 rounded-t-lg">
        <h2 className="text-3xl font-bold mb-2">🥬 割引情報を投稿する 🛒</h2>
        <p className="text-sm opacity-90">
          新鮮な情報をシェアしてみんなでお得に買い物しよう！
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-cream)] p-6 rounded-b-lg shadow-lg"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold text-[var(--color-dark-green)]">
              📌 タイトル
            </span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered bg-white border-[var(--color-fresh-green)]"
            placeholder="例: 夕方限定！野菜全品20%オフ"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-[var(--color-dark-green)]">
                ⏰ 開始時間
              </span>
            </label>
            <input
              type="time"
              name="start_time"
              required
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)}
              className="input input-bordered bg-white border-[var(--color-fresh-green)] w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-[var(--color-dark-green)]">
                ⏰ 終了時間
              </span>
            </label>
            <input
              type="time"
              name="end_time"
              required
              value={end_time}
              onChange={(e) => setEnd_time(e.target.value)}
              className="input input-bordered bg-white border-[var(--color-fresh-green)] w-full"
            />
          </div>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold text-[var(--color-dark-green)]">
              💹 割引率 (%)
            </span>
          </label>
          <input
            type="number"
            name="discount_rate"
            min="0"
            max="100"
            required
            value={discount_rate}
            onChange={(e) => setDiscount_rate(Number(e.target.value))}
            className="input input-bordered bg-white border-[var(--color-fresh-green)]"
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold text-[var(--color-dark-green)]">
              📝 説明
            </span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered bg-white border-[var(--color-fresh-green)] h-24"
            placeholder="割引の詳細情報を入力してください"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn bg-[var(--color-fresh-green)] hover:bg-[var(--color-dark-green)] text-white btn-lg w-full max-w-xs"
          >
            🥕 投稿する
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
