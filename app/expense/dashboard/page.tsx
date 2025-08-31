"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2Icon } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./dataTable"
import { Expense } from "@/types/expense"
import { EPENSE_CATEGORY_COLORS } from "@/constants/expense-categories"
import { formatAmount, formatDate } from "@/utils/format"
import { getExpenseCategoryLabel } from "@/utils/expense"
// localStorageのimportを削除し、API関数をimport
import { fetchExpenses, deleteExpenseApi } from "@/utils/api"

// テーブル列の定義
const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "日付",
  },
  {
    accessorKey: "amount",
    header: "金額",
  },
  {
    accessorKey: "category",
    header: "カテゴリ",
    cell: ({ row }) => {
      return <Badge className={EPENSE_CATEGORY_COLORS[row.original.category as keyof typeof EPENSE_CATEGORY_COLORS]}>{getExpenseCategoryLabel(row.original.category)}</Badge>
    },
  },
]

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // APIからデータを読み込み
  useEffect(() => {
    const loadExpensesData = async () => {
      try {
        setLoading(true)
        const data = await fetchExpenses()
        setExpenses(data)
        setError(null)
      } catch (err) {
        console.error('Failed to load expenses:', err)
        setError('支出データの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    loadExpensesData()
  }, [])

  // 支出を削除
  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpenseApi(id)
      // UIから即座に削除
      setExpenses(prev => prev.filter(expense => expense.id !== id))
    } catch (err) {
      console.error('Failed to delete expense:', err)
      alert('支出データの削除に失敗しました')
    }
  }

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
        {expenses.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">総支出額</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatAmount(expenses.reduce((total, expense) => total + expense.amount, 0))}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 支出一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>支出一覧</CardTitle>
            <CardDescription>直近の支出が新しい順に表示されます（{expenses.length}件）</CardDescription>
          </CardHeader>
          <CardContent>
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>まだ支出が登録されていません</p>
                <p className="text-sm">　支出入力画面から支出を追加してください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={expense.id}>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                          <Badge className={EPENSE_CATEGORY_COLORS[expense.category as keyof typeof EPENSE_CATEGORY_COLORS]}>
                            {getExpenseCategoryLabel(expense.category)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">{formatAmount(expense.amount)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        </div>
                        {expense.memo && <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{expense.memo}</p>}
                      </div>
                    </div>
                    {index < expenses.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {/* 一覧テーブル */}
        <DataTable columns={columns} data={expenses} />
      </div>
    </div>
  )
}