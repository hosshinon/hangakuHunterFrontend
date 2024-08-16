'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { postDiscount } from '../util/api/postDiscount'

const PostForm = ({ shop_place_id }: { shop_place_id: string }) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [start_time, setStart_time] = useState<string>('')
  const [end_time, setEnd_time] = useState<string>('')
  const [discount_rate, setDiscount_rate] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('投稿ボタンがクリックされました')
    console.log(
      shop_place_id,
      title,
      start_time,
      end_time,
      discount_rate,
      description,
    )
    try {
      await postDiscount(
        shop_place_id,
        title,
        start_time,
        end_time,
        discount_rate,
        description,
      )
      //フォーム内を空にする
      setTitle('')
      setStart_time('')
      setEnd_time('')
      setDiscount_rate('')
      setDescription('')
      //投稿後に画面をリフレッシュ
      router.refresh()
    } catch (error) {
      console.error('投稿エラー:', error)
      alert(`フェッチに失敗しました: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">割引情報を投稿する</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-lg shadow-md"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">タイトル</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">開始時間</span>
          </label>
          <input
            type="time"
            name="start_time"
            required
            value={start_time}
            onChange={(e) => setStart_time(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">終了時間</span>
          </label>
          <input
            type="time"
            name="end_time"
            required
            value={end_time}
            onChange={(e) => setEnd_time(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">割引率(%)</span>
          </label>
          <input
            type="number"
            name="discount_rate"
            min="0"
            max="100"
            required
            value={discount_rate}
            onChange={(e) => setDiscount_rate(Number(e.target.value))}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">説明</span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full">
            投稿する
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
