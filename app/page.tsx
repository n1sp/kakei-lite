"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1>Kakei Lite</h1>
      <div className="flex gap-4">
        <Link href="/expense/dashboard">支出一覧</Link>
        <Link href="/expense/additional">支出追加</Link>
      </div>
    </main>
  )
}