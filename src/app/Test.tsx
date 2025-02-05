'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function Page() {
  const [count, setCount] = useState(0)
  return (
    <h1>
      {count} <span onClick={() => setCount(count + 1)}>click</span>
      <Link href="/user/login">跳转</Link>
    </h1>
  )
}
