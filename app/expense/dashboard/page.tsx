"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2Icon } from "lucide-react"

interface Expense {
  id: string
  date: string
  amount: number
  category: string
  memo: string
  createdAt: number
}

const categories = [
  { value: "food", label: "食費" },
  { value: "living", label: "生活費" },
  { value: "fixed", label: "固定費" },
  { value: "misc", label: "雑費" },
]

const categoryColors = {
  food: "bg-orange-100 text-orange-800",
  living: "bg-blue-100 text-blue-800",
  fixed: "bg-purple-100 text-purple-800",
  misc: "bg-gray-100 text-gray-800",
}

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    memo: "",
  })
  // localStorageからデータを読み込み
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])
  
  // localStorageにデータを保存
  const saveToLocalStorage = (newExpenses: Expense[]) => {
    localStorage.setItem("expenses", JSON.stringify(newExpenses))
  }
  // 支出を削除
  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    saveToLocalStorage(updatedExpenses)
  }
    // 金額をフォーマット
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }
  // カテゴリ名を取得
  const getCategoryLabel = (value: string) => {
    return categories.find((cat) => cat.value === value)?.label || value
  }
  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">支出管理</h1>
          <p className="text-gray-600 mt-2">日々の支出を記録・管理しましょう</p>
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
                <p className="text-sm">上のフォームから支出を追加してください</p>
              </div>
            ) : (
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={expense.id}>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                          <Badge className={categoryColors[expense.category as keyof typeof categoryColors]}>
                            {getCategoryLabel(expense.category)}
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
      </div>
    </div>
  )
}