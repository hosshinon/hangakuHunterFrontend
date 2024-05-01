'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { postDiscount } from '../util/api/postDiscount'

const PostForm = ({ shop_id }: { shop_id: number }) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [start_time, setStart_time] = useState<string>('')
  const [end_time, setEnd_time] = useState<string>('')
  const [discount_rate, setDiscount_rate] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(
      shop_id,
      title,
      start_time,
      end_time,
      discount_rate,
      description,
    )
    try {
      await postDiscount(
        shop_id,
        title,
        start_time,
        end_time,
        discount_rate,
        description,
      )

      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('投稿エラー:', error)
      alert(`フェッチに失敗しました: ${error.message}`)
    }
  }

  return (
    <div className="bg-green-400">
      <h2>割引情報を投稿する</h2>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル:
          <input
            type="text"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          開始時間:
          <input
            type="time"
            name="start_time"
            required
            onChange={(e) => setStart_time(e.target.value)}
          />
        </label>
        <br />
        <label>
          終了時間:
          <input
            type="time"
            name="end_time"
            required
            onChange={(e) => setEnd_time(e.target.value)}
          />
        </label>
        <br />
        <label>
          割引率(%):
          <input
            type="number"
            name="discount_rate"
            min="0"
            max="100"
            required
            onChange={(e) => setDiscount_rate(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          説明:
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">投稿</button>
      </form>
    </div>
  )
}

export default PostForm
