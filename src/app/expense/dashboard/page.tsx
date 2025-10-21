"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./dataTable"
import { expenseColumns } from "@/features/expense/components/ExpenseTableColumns"
import { ExpenseSummaryCard } from "@/features/expense/components/ExpenseSummaryCard"
import { useExpenses } from "@/features/expense/hooks/useExpenses"
import { ExpenseList } from "@/features/expense/components/ExpenseList"

export default function ExpenseDashboard() {
  const { expenses, loading, error, totalAmount, deleteExpense } = useExpenses();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p>読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              再読み込み
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">支出一覧</h1>
          <p className="text-gray-600 mt-2">日々の支出を確認しましょう</p>
        </div>

        {/* 合計金額表示 */}
        {expenses.length > 0 && <ExpenseSummaryCard totalAmount={totalAmount} />}

        {/* 支出一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>支出一覧</CardTitle>
            <CardDescription>直近の支出が新しい順に表示されます（{expenses.length}件）</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </CardContent>
        </Card>
        {/* 一覧テーブル */}
        <DataTable columns={expenseColumns} data={expenses} />
      </div>
    </div>
  )
}