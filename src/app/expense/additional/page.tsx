"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, PlusIcon } from "lucide-react"

import { EXPENSE_CATEGORIES } from "@/features/expense/constants"
// localStorageのimportを削除し、API関数をimport
import { createExpenseApi } from "@/features/expense/api/client"

export default function ExpenseInputForm() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    memo: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // 支出を追加
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.category) {
      setMessage({ type: 'error', text: '金額とカテゴリは必須です' })
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      await createExpenseApi({
        date: formData.date,
        amount: Number.parseFloat(formData.amount),
        category: formData.category,
        memo: formData.memo,
      })

      // 成功メッセージ表示
      setMessage({ type: 'success', text: '支出を登録しました！' })

      // フォームをリセット（日付は今日のまま）
      setFormData({
        date: new Date().toISOString().split("T")[0],
        amount: "",
        category: "",
        memo: "",
      })
    } catch (error) {
      console.error('Failed to create expense:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '支出の登録に失敗しました'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">支出入力</h1>
          <p className="text-gray-600 mt-2">日々の支出を入力しましょう</p>
        </div>

        {/* メッセージ表示 */}
        {message && (
          <div className={`p-4 rounded-lg ${message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            {message.text}
          </div>
        )}

        {/* 支出入力フォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              支出を追加
            </CardTitle>
            <CardDescription>新しい支出を入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    日付
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">金額 *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    min="0"
                    step="1"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="memo">メモ（任意）</Label>
                <Textarea
                  id="memo"
                  placeholder="支出の詳細やメモを入力..."
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  rows={3}
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <PlusIcon className="w-4 h-4 mr-2" />
                {loading ? '登録中...' : '支出を追加'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}