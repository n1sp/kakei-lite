"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* タイトル */}
      <h1 className="text-2xl font-bold mb-6 text-center">Kakei Lite</h1>

      {/* ページ遷移リンク */}
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/expense/dashboard">支出一覧</Link>
        </Button>
        <Button asChild>
        {/* <Button asChild variant="secondary"> */}
          <Link href="/expense/additional">支出追加</Link>
        </Button>

      </div>
    </main>
  )
}