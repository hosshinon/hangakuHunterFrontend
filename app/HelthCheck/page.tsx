import React from 'react'

const page = async () => {
  const url = 'http://host.docker.internal:3000/api/v1/health_check'
  const res = await fetch(url, {
    cache: 'no-store',
  })
  const health_check = await res.json()
  return (
    <div>
      <h1>HelthCheck</h1>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {health_check.message}</div>
    </div>
  )
}

export default page
