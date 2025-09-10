"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* タイトル */}
      <h1 className="text-2xl font-bold mb-6 text-center">Kakei Lite</h1>

      {/* ページ遷移リンク */}
      <div className="flex gap-4">
        <Link href="/expense/dashboard" className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-150">支出一覧</Link>
        <Link href="/expense/additional" className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-150">支出追加</Link>
      </div>
    </main>
  )
}